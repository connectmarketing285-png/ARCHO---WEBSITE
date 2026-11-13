import type { ImagenSanity as Imagen } from '@/data/blog'
import { dimensiones, srcSet, urlImagen } from '@/lib/sanity-imagen'

type Props = {
  imagen: Imagen
  /** Atributo `sizes`. Sin él el navegador asume 100vw y baja de más en móvil. */
  sizes: string
  /** ancho/alto. Sin ella se respeta la proporción de la imagen (o de su recorte). */
  proporcion?: number
  className?: string
  /** La imagen principal de un artículo es candidata a LCP: carga sin `lazy`. */
  prioridad?: boolean
  /**
   * Que no se pinte más ancha que el original. Para imágenes a su proporción
   * natural (cabecera del artículo, cuerpo); no para las que rellenan una caja
   * con object-cover.
   */
  limitarAlOriginal?: boolean
}

/** Imagen del CDN de Sanity con srcset. Mismo papel que UnsplashImage. */
export default function ImagenSanity({
  imagen,
  sizes,
  proporcion,
  className,
  prioridad = false,
  limitarAlOriginal = false,
}: Props) {
  const { width, height } = dimensiones(imagen, proporcion)

  return (
    <img
      src={urlImagen(imagen, 768, proporcion)}
      srcSet={srcSet(imagen, proporcion)}
      sizes={sizes}
      width={width}
      height={height}
      alt={imagen.alt}
      loading={prioridad ? 'eager' : 'lazy'}
      fetchPriority={prioridad ? 'high' : undefined}
      decoding="async"
      className={className}
      style={limitarAlOriginal ? { maxWidth: `${width}px` } : undefined}
    />
  )
}
