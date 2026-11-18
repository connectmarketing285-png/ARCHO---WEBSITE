import listado from '@/data/blog.generated.json'

/**
 * EL BLOG  ·  datos que entran en el bundle
 *
 * `blog.generated.json` lo escribe tools/traer-blog.mjs en cada build (y en
 * `npm run dev`) a partir de lo publicado en Sanity; no se versiona. Aquí solo
 * va el LISTADO. El cuerpo de cada artículo viaja aparte: embebido en el HTML
 * prerenderizado, o en /datos/blog/<slug>.json al navegar dentro del sitio
 * (ver lib/articulo.tsx).
 */

export type ImagenSanity = {
  url: string
  width: number
  height: number
  alt: string
  /** Punto de interés marcado en el Studio, en fracciones de la imagen completa. */
  hotspot: { x: number; y: number } | null
  /** Recorte marcado en el Studio, en fracciones de cada borde. */
  crop: { top: number; bottom: number; left: number; right: number } | null
}

export type PostResumen = {
  /** El `_id` de Sanity: permanente aunque cambie el slug. */
  id: string
  slug: string
  titulo: string
  extracto: string
  publishedAt: string
  updatedAt: string
  /** `null` = firma ARCHO. */
  autor: string | null
  seoTitulo: string | null
  seoDescripcion: string | null
  minutos: number
  imagen: ImagenSanity
}

/* --- El cuerpo (Portable Text), con solo lo que el Studio permite. ------- */

export type Span = { _type: 'span'; _key: string; text: string; marks?: string[] }
export type Enlace = { _type: 'link'; _key: string; href: string }

export type BloqueTexto = {
  _type: 'block'
  _key: string
  style?: 'normal' | 'h2' | 'h3'
  listItem?: 'bullet' | 'number'
  level?: number
  children: Span[]
  markDefs?: Enlace[]
}

export type BloqueImagen = ImagenSanity & { _type: 'imagen'; _key: string }

export type Bloque = BloqueTexto | BloqueImagen

export type Articulo = { slug: string; cuerpo: Bloque[] }

/** Del más reciente al más antiguo (así los ordena la consulta). */
export const POSTS: readonly PostResumen[] = listado as PostResumen[]

export function postPorSlug(slug: string | undefined) {
  return POSTS.find((p) => p.slug === slug)
}

export const rutaPost = (slug: string) => `/blog/${slug}`

/** Firma del artículo: el autor de Sanity o, si lo dejaron vacío, ARCHO. */
export const firma = (post: PostResumen) => post.autor ?? 'ARCHO'

/** Textos de la página /blog. */
export const BLOG_PAGE = {
  eyebrow: 'Blog · Notas de obra',
  title: { lead: 'Lo que aprendemos', accent: 'en cada obra.' },
  lede: 'Criterios para decidir mejor antes y durante una construcción: presupuestos, procesos, materiales y obra, contados desde la práctica.',
  vacio: 'Muy pronto publicaremos el primer artículo.',
} as const
