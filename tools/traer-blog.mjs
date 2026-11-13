/**
 * TRAE LOS ARTÍCULOS PUBLICADOS DE SANITY  ·  primer paso de `npm run build`
 *
 *   npm run blog                 (a mano)
 *   node tools/traer-blog.mjs --tolerante   (lo usa `npm run dev`)
 *
 * El contenido del blog entra en el build, no en tiempo de ejecución: cada
 * publicación en Sanity dispara un redespliegue (webhook, fase 6) y el sitio
 * se vuelve a construir con lo publicado en ese momento.
 *
 * ESCRIBE DOS COSAS, ninguna versionada (.gitignore):
 *
 *   src/data/blog.generated.json
 *     El LISTADO: título, slug, extracto, fechas, imagen. Entra en el bundle
 *     del sitio porque lo necesitan /blog, los metadatos de cada ruta y el
 *     sitemap. Crece poco con cada artículo.
 *
 *   public/datos/blog/<slug>.json
 *     El CUERPO de cada artículo, uno por archivo. NO entra en el bundle: el
 *     HTML prerenderizado ya trae el artículo entero, y el navegador solo
 *     pide este JSON al llegar a un artículo navegando dentro del sitio. Así
 *     el JS no crece con cada publicación.
 *
 * SI SANITY NO RESPONDE, EL BUILD FALLA, y es a propósito: Vercel conserva el
 * último despliegue bueno. Publicar un blog vacío porque la API tardó sería
 * borrar los artículos del sitio (y del sitemap) hasta el siguiente build.
 * Lo mismo con un artículo incompleto: se detiene el build con su título en
 * el mensaje, en vez de publicarlo roto.
 *
 * `--tolerante` es solo para desarrollo: si no hay red pero ya existe un
 * listado de una ejecución anterior, avisa y sigue con ese.
 *
 * Sin dependencias: la API HTTP de Sanity con `fetch`. El dataset es público
 * y no hace falta token.
 */

import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const PROJECT_ID = '527gs4h8'
const DATASET = 'production'
const API_VERSION = '2025-02-19'

const LISTADO = 'src/data/blog.generated.json'
const CUERPOS = 'public/datos/blog'
const TOLERANTE = process.argv.includes('--tolerante')

/* `api.sanity.io` y no `apicdn.sanity.io`: el build lo dispara una
   publicación, y la CDN puede servir todavía la versión anterior durante unos
   segundos. Aquí importa más estar al día que la latencia.

   `perspective=published`: solo lo publicado, nunca borradores. */
const CONSULTA = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  _updatedAt,
  titulo,
  "slug": slug.current,
  extracto,
  publishedAt,
  autor,
  seoTitulo,
  seoDescripcion,
  "imagen": imagenPrincipal {
    alt, hotspot, crop,
    "asset": asset-> { url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }
  },
  cuerpo[] {
    ...,
    _type == "imagen" => {
      alt, hotspot, crop,
      "asset": asset-> { url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }
    }
  }
}`

const url =
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
  `?query=${encodeURIComponent(CONSULTA)}&perspective=published`

/* 1 · Consultar, con dos reintentos ante fallos de red o errores 5xx. */
async function consultar() {
  let ultimoError
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(20_000) })
      if (res.ok) return (await res.json()).result
      ultimoError = new Error(`Sanity respondió ${res.status}: ${(await res.text()).slice(0, 300)}`)
      if (res.status < 500) break
    } catch (error) {
      ultimoError = error
    }
    if (intento < 3) await new Promise((r) => setTimeout(r, intento * 2000))
  }
  throw ultimoError
}

let posts
try {
  posts = await consultar()
} catch (error) {
  if (TOLERANTE && existsSync(LISTADO)) {
    console.warn(`  ⚠ No se pudo consultar Sanity (${error.message}). Sigo con el listado anterior.`)
    process.exit(0)
  }
  console.error('\n  ✖ No se pudo consultar Sanity. El build se detiene para que Vercel conserve el')
  console.error('    último despliegue bueno.\n')
  throw error
}

if (!Array.isArray(posts)) throw new Error('Sanity no devolvió una lista de artículos.')

/* 2 · Validar. El Studio ya obliga a todo esto; se comprueba otra vez porque
   un artículo roto en el sitio cuesta más que un build detenido. */
const FORMATO_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const vistos = new Set()

for (const p of posts) {
  const quien = `"${p.titulo ?? p._id}"`
  const falta = (que) => {
    throw new Error(`El artículo ${quien} no tiene ${que}. Corrígelo en el Studio y vuelve a publicar.`)
  }
  if (!p.titulo?.trim()) falta('título')
  if (!FORMATO_SLUG.test(p.slug ?? '')) falta(`una URL válida (tiene "${p.slug}")`)
  if (!p.extracto?.trim()) falta('extracto')
  if (!p.publishedAt) falta('fecha de publicación')
  if (!p.imagen?.asset?.url) falta('imagen principal')
  if (!p.imagen.alt?.trim()) falta('texto alternativo en la imagen principal')
  if (vistos.has(p.slug)) throw new Error(`Dos artículos usan la misma URL: /blog/${p.slug}.`)
  vistos.add(p.slug)
}

/* 3 · Escribir. */
const imagen = (img) => ({
  url: img.asset.url,
  width: img.asset.width,
  height: img.asset.height,
  alt: img.alt?.trim() ?? '',
  hotspot: img.hotspot ? { x: img.hotspot.x, y: img.hotspot.y } : null,
  crop: img.crop
    ? { top: img.crop.top, bottom: img.crop.bottom, left: img.crop.left, right: img.crop.right }
    : null,
})

/* Minutos de lectura, a 200 palabras por minuto: se calcula aquí porque el
   listado no lleva el cuerpo. */
const minutos = (cuerpo) => {
  const palabras = (cuerpo ?? [])
    .filter((b) => b._type === 'block')
    .flatMap((b) => b.children ?? [])
    .map((c) => c.text ?? '')
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(palabras / 200))
}

/* Los bloques de imagen del cuerpo se aplanan al mismo formato que la imagen
   principal; los de texto pasan tal cual. Los que no tengan imagen (un bloque
   vacío) se descartan. */
const cuerpo = (bloques) =>
  (bloques ?? []).flatMap((b) => {
    if (b._type !== 'imagen') return [b]
    return b.asset?.url ? [{ _type: 'imagen', _key: b._key, ...imagen(b) }] : []
  })

const listado = posts.map((p) => ({
  slug: p.slug,
  titulo: p.titulo.trim(),
  extracto: p.extracto.trim(),
  publishedAt: p.publishedAt,
  updatedAt: p._updatedAt,
  autor: p.autor?.trim() || null,
  seoTitulo: p.seoTitulo?.trim() || null,
  seoDescripcion: p.seoDescripcion?.trim() || null,
  minutos: minutos(p.cuerpo),
  imagen: imagen(p.imagen),
}))

writeFileSync(LISTADO, JSON.stringify(listado, null, 2) + '\n')

/* Se borra la carpeta entera antes de escribir: un artículo despublicado no
   debe dejar su cuerpo servido en /datos/blog/. */
rmSync(CUERPOS, { recursive: true, force: true })
mkdirSync(CUERPOS, { recursive: true })
for (const p of posts) {
  writeFileSync(join(CUERPOS, `${p.slug}.json`), JSON.stringify({ slug: p.slug, cuerpo: cuerpo(p.cuerpo) }))
}

console.log(`  ${posts.length} artículo(s) publicados traídos de Sanity → ${LISTADO} y ${CUERPOS}/`)
