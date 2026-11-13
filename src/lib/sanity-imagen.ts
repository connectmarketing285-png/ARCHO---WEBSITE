import type { ImagenSanity } from '@/data/blog'

/**
 * URLs del CDN de imágenes de Sanity, sin @sanity/image-url.
 *
 * El CDN redimensiona y recorta por parámetros de la URL, igual que Unsplash
 * en lib/unsplash.ts:
 *
 *   rect=x,y,w,h      el recorte que el editor marcó en el Studio, en px
 *   w / h             tamaño de salida
 *   fit=crop + crop=focalpoint + fp-x/fp-y
 *                     al forzar una proporción, recorta alrededor del punto
 *                     de interés (hotspot) en vez de por el centro
 *   auto=format       AVIF/WebP a quien los acepte
 *
 * NUNCA SE PIDE MÁS ANCHO QUE EL ORIGINAL. Las imágenes las sube el equipo de
 * marketing y pueden ser pequeñas (la del primer artículo mide 479 px): pedir
 * 1200 px de una de 479 solo agranda los píxeles y pesa más.
 */

export const ANCHOS = [480, 768, 1080, 1440, 1920] as const

/** El área útil de la imagen: la completa, o el recorte marcado en el Studio. */
function area(img: ImagenSanity) {
  const c = img.crop
  if (!c) return { x: 0, y: 0, w: img.width, h: img.height }
  const x = Math.round(c.left * img.width)
  const y = Math.round(c.top * img.height)
  return {
    x,
    y,
    w: Math.round((1 - c.left - c.right) * img.width),
    h: Math.round((1 - c.top - c.bottom) * img.height),
  }
}

/** Ancho y alto útiles, para los atributos `width`/`height` (evitan saltos de maquetación). */
export function dimensiones(img: ImagenSanity, proporcion?: number) {
  const a = area(img)
  if (!proporcion) return { width: a.w, height: a.h }
  return { width: a.w, height: Math.round(a.w / proporcion) }
}

const limitar = (n: number) => Math.min(1, Math.max(0, n))

/**
 * @param proporcion ancho/alto de salida. Sin ella se respeta la del original.
 */
export function urlImagen(img: ImagenSanity, ancho: number, proporcion?: number) {
  const a = area(img)
  const w = Math.min(Math.round(ancho), a.w)
  const params = new URLSearchParams()

  if (img.crop) params.set('rect', `${a.x},${a.y},${a.w},${a.h}`)
  params.set('w', String(w))

  if (proporcion) {
    params.set('h', String(Math.round(w / proporcion)))
    params.set('fit', 'crop')
    if (img.hotspot) {
      /* El hotspot viene en fracciones de la imagen completa; el CDN lo quiere
         relativo al área recortada. */
      params.set('crop', 'focalpoint')
      params.set('fp-x', limitar((img.hotspot.x * img.width - a.x) / a.w).toFixed(3))
      params.set('fp-y', limitar((img.hotspot.y * img.height - a.y) / a.h).toFixed(3))
    }
  }

  params.set('auto', 'format')
  params.set('q', '80')
  return `${img.url}?${params}`
}

/** `srcset` con los anchos de ANCHOS que no superan el original (y el original). */
export function srcSet(img: ImagenSanity, proporcion?: number) {
  const max = area(img).w
  const anchos = [...new Set([...ANCHOS.filter((w) => w < max), Math.min(max, ANCHOS.at(-1)!)])]
  return anchos.map((w) => `${urlImagen(img, w, proporcion)} ${w}w`).join(', ')
}
