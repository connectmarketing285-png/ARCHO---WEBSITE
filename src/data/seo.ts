import { FOUNDED_YEAR } from '@/data/about'
import { POSTS, postPorSlug, rutaPost, type PostResumen } from '@/data/blog'
import { NAV_ITEMS } from '@/data/nav'
import { SITE } from '@/data/site'
import { dimensiones, urlImagen } from '@/lib/sanity-imagen'

/**
 * METADATOS, SITEMAP, ROBOTS Y DATOS ESTRUCTURADOS  ·  una sola tabla
 *
 * De aquí salen el <title>, la description, las etiquetas Open Graph, la
 * canónica de cada página, el sitemap.xml, el robots.txt y el JSON-LD. Lo
 * escribe tools/prerenderizar.mjs en el build; Layout solo toma el título al
 * navegar en el cliente.
 *
 * Antes cada pieza vivía en un sitio distinto: la description y las og: fijas
 * en index.html (las mismas para todas las rutas), el sitemap escrito a mano
 * en public/ y el título en Layout. Cualquier ruta nueva había que recordarla
 * en tres lugares. Ahora, si una ruta del menú no está aquí, el build falla.
 */

/**
 * El dominio canónico, con www: archo.com.mx redirige ahí con un 308. Todas las
 * URL absolutas del sitio (canónicas, og:url, og:image, sitemap, JSON-LD)
 * salen de esta constante.
 */
export const SITE_URL = 'https://www.archo.com.mx'

export type MetaRuta = {
  /** El <title> completo. */
  title: string
  /** Por debajo de 160 caracteres, que es donde Google recorta. */
  description: string
}

/** La tarjeta de enlace. Una para todo el sitio; ver tools/generar-og.mjs. */
export const OG_IMAGE = {
  path: '/og/archo.png',
  width: 1200,
  height: 630,
  alt: `${SITE.name} — Diseño y construcción, un solo proceso.`,
} as const

const titulo = (label: string) => `${label} — ${SITE.name}`

/**
 * Las descripciones resumen lo que ya dice cada página (data/*.ts): no
 * prometen nada que el sitio no diga. Los títulos son los mismos que el sitio
 * ya mostraba ("<etiqueta del menú> — ARCHO"); afinarlos para búsqueda es una
 * decisión aparte, porque cambian lo que se ve en los resultados.
 */
export const SEO = {
  '/': {
    title: SITE.title,
    description:
      'ARCHO es un estudio integral de arquitectura y construcción con presencia en San Luis Potosí, Querétaro, Guanajuato, Monterrey, Guadalajara y Baja California.',
  },
  '/projects': {
    title: titulo('Proyectos'),
    description:
      'Obra seleccionada de ARCHO en tipologías residencial, cultural, hospitalidad y cívica: cada proyecto, una postura sobre cómo debería habitarse un lugar.',
  },
  '/services': {
    title: titulo('Servicios'),
    description:
      'Estructura metálica, ingeniería, instalaciones, concreto, obra residencial y carpintería. Diseño, ingeniería y obra conducidos por el mismo equipo.',
  },
  '/about': {
    title: titulo('Estudio'),
    description: `Desde ${FOUNDED_YEAR}, una constructora que piensa como estudio de arquitectura y un estudio que entiende la obra. Método, visión y valores de ARCHO.`,
  },
  '/process': {
    title: titulo('Proceso'),
    description:
      'Cómo una obra se vuelve real en cinco fases: descubrir, diseñar, desarrollar, ejecutar y acompañar. El método de trabajo de ARCHO.',
  },
  '/contact': {
    title: titulo('Contacto'),
    description:
      'Inicia una conversación con ARCHO: oficina en San Luis Potosí, obra en Querétaro, Guanajuato, Monterrey, Guadalajara y Baja California.',
  },
  '/blog': {
    title: titulo('Blog'),
    description:
      'Artículos de ARCHO sobre presupuestos, procesos, materiales y obra: criterios para decidir mejor antes y durante una construcción.',
  },
} as const satisfies Record<string, MetaRuta>

export type Ruta = keyof typeof SEO

/**
 * El 404 no es una ruta: es lo que se sirve cuando no hay ninguna. Va con
 * `noindex, follow` y sin canónica ni og:url (ver `metadatosDe`).
 */
export const SEO_404: MetaRuta = {
  title: titulo('Página no encontrada'),
  description: 'La dirección no existe o cambió. Desde aquí se llega a todas las páginas de ARCHO.',
}

/** Las rutas fijas: las del menú, con sus metadatos escritos arriba. */
export const RUTAS_FIJAS = Object.keys(SEO) as Ruta[]

/** Una por artículo publicado, del listado que trae tools/traer-blog.mjs. */
export const RUTAS_BLOG = POSTS.map((p) => rutaPost(p.slug))

/** Todas: las que se prerenderizan y las que van al sitemap. */
export const RUTAS: readonly string[] = [...RUTAS_FIJAS, ...RUTAS_BLOG]

export function esRuta(pathname: string): pathname is Ruta {
  return Object.hasOwn(SEO, pathname)
}

/** El artículo de una ruta /blog/<slug>, si está publicado. */
export function postDeRuta(ruta: string) {
  const slug = /^\/blog\/([^/]+)$/.exec(ruta)?.[1]
  return slug ? postPorSlug(slug) : undefined
}

/**
 * Título y description de un artículo. Los campos SEO del Studio mandan si
 * están rellenos; si no, el título y el extracto. Al título se le añade
 * " — ARCHO", como al resto de páginas.
 */
export function metaDePost(post: PostResumen): MetaRuta {
  return {
    title: titulo(post.seoTitulo ?? post.titulo),
    description: post.seoDescripcion ?? post.extracto,
  }
}

/** Los metadatos de cualquier ruta, fija o de artículo; `null` si no existe. */
export function metaDeRuta(ruta: string): MetaRuta | null {
  if (esRuta(ruta)) return SEO[ruta]
  const post = postDeRuta(ruta)
  return post ? metaDePost(post) : null
}

/** Lo que usa Layout al navegar: el título de la ruta, o el del 404. */
export function pageTitle(pathname: string) {
  return (metaDeRuta(pathname) ?? SEO_404).title
}

/**
 * La tarjeta de enlace de un artículo: su imagen principal, recortada a la
 * proporción de las tarjetas (1200x630) alrededor del punto de interés. Si la
 * imagen es más estrecha que 1200 px, el CDN no la agranda: sale al ancho del
 * original y se declara con ese tamaño.
 */
function ogImagenDePost(post: PostResumen) {
  const proporcion = OG_IMAGE.width / OG_IMAGE.height
  const width = Math.min(OG_IMAGE.width, dimensiones(post.imagen).width)
  return {
    url: urlImagen(post.imagen, OG_IMAGE.width, proporcion),
    width,
    height: Math.round(width / proporcion),
    alt: post.imagen.alt,
  }
}

/**
 * La tabla de rutas del menú y la de metadatos tienen que coincidir. Lo
 * comprueba el prerender antes de escribir nada: una ruta en el menú sin
 * metadatos saldría sin description, y una ruta aquí que ya no existe
 * terminaría en el sitemap apuntando a un 404.
 */
export function comprobarRutas() {
  const menu = NAV_ITEMS.map((i) => i.to)
  const faltan = menu.filter((r) => !esRuta(r))
  const sobran = RUTAS_FIJAS.filter((r) => !menu.includes(r))
  if (faltan.length || sobran.length) {
    throw new Error(
      `seo.ts y nav.ts no coinciden. Sin metadatos: [${faltan.join(', ')}]. Sin ruta en el menú: [${sobran.join(', ')}].`,
    )
  }
}

/**
 * Las etiquetas de una ruta, como pares nombre/contenido.
 *
 * Sin twitter:title, twitter:description ni twitter:image: X usa las og:
 * equivalentes cuando faltan, y declararlas sería mantener dos copias del
 * mismo texto. Solo `twitter:card`, que no tiene equivalente og.
 */
export function metadatosDe(ruta: string, meta: MetaRuta, es404 = false) {
  /* El 404 es UN archivo que Vercel sirve para cualquier dirección que no
     exista: no sabe cuál le pidieron, así que no puede declarar una canónica
     correcta. Y una página noindex no compite por ninguna URL. */
  const url = es404 ? null : `${SITE_URL}${ruta === '/' ? '/' : ruta}`

  /* Un artículo es `og:type=article`, con su imagen y sus fechas. */
  const post = es404 ? undefined : postDeRuta(ruta)
  const imagen = post
    ? ogImagenDePost(post)
    : { url: `${SITE_URL}${OG_IMAGE.path}`, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }

  return {
    title: meta.title,
    canonical: url,
    /* `name` para las estándar, `property` para Open Graph: son dos
       vocabularios y Facebook solo lee `property`. */
    nombradas: [
      ['description', meta.description],
      ['twitter:card', 'summary_large_image'],
      ...(es404 ? [['robots', 'noindex, follow']] : []),
    ] as [string, string][],
    propiedades: [
      ['og:type', post ? 'article' : 'website'],
      ['og:site_name', SITE.name],
      ['og:locale', 'es_MX'],
      ['og:title', meta.title],
      ['og:description', meta.description],
      ...(url ? [['og:url', url]] : []),
      ['og:image', imagen.url],
      ['og:image:width', String(imagen.width)],
      ['og:image:height', String(imagen.height)],
      ['og:image:alt', imagen.alt],
      ...(post
        ? [
            ['article:published_time', post.publishedAt],
            ['article:modified_time', post.updatedAt],
          ]
        : []),
    ] as [string, string][],
  }
}

/** ¿El autor escrito en el Studio es la propia empresa ("Archo Constructora")? */
const firmaDeArcho = (autor: string | null) => !autor || /\barcho\b/i.test(autor)

/**
 * Datos estructurados de un artículo (schema.org BlogPosting), uno por página.
 *
 * `publisher` apunta por `@id` a la entidad de la portada (`#organizacion`,
 * el GeneralContractor de `organizacionJsonLd`). Lleva además nombre, URL y
 * logo porque la entidad completa está en otra página y un lector de datos
 * estructurados no siempre sigue la referencia.
 *
 * `author`: una persona si el Studio trae un nombre propio; la empresa si el
 * campo está vacío o dice ARCHO (el primer artículo firma "Archo
 * Constructora", que no es una Person).
 */
export function blogPostingJsonLd(post: PostResumen) {
  const url = `${SITE_URL}${rutaPost(post.slug)}`
  const organizacion = {
    '@type': 'GeneralContractor',
    '@id': `${SITE_URL}/#organizacion`,
    name: 'ARCHO Constructora',
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}${SITE.lockup}` },
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#articulo`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: post.titulo,
    description: metaDePost(post).description,
    image: [urlImagen(post.imagen, 1920)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: 'es-MX',
    author: firmaDeArcho(post.autor) ? organizacion : { '@type': 'Person', name: post.autor },
    publisher: organizacion,
  }
}

/**
 * Datos estructurados para búsqueda local. Solo en la portada: Google espera
 * una entidad de negocio por sitio y la busca en la home. Repetirla en cada
 * ruta no la refuerza, obliga a reconciliar seis declaraciones de lo mismo.
 *
 * El contenido es el que estaba en index.html, sin cambios. `geo` lleva las
 * coordenadas exactas de la oficina, facilitadas por el cliente; un valor
 * aproximado sería peor que ninguno, porque Google lo toma como la ubicación
 * declarada del negocio.
 */
export function organizacionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE_URL}/#organizacion`,
    name: 'ARCHO Constructora',
    alternateName: 'ARCHO Estudio',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}${SITE.lockup}`,
    image: `${SITE_URL}${SITE.lockup}`,
    description:
      'Estudio integral de arquitectura y construcción. Diseño arquitectónico y ejecución de obra como un solo proceso.',
    email: SITE.email,
    telephone: SITE.phone.display,
    foundingDate: String(FOUNDED_YEAR),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Prol, Santos Degollado 1137, Tangamanga, Cuarto piso',
      addressLocality: 'San Luis Potosí',
      addressRegion: 'S.L.P.',
      postalCode: '78269',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.143511,
      longitude: -100.996727,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=22.143511,-100.996727',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: [
      'San Luis Potosí',
      'Querétaro',
      'Guanajuato',
      'Monterrey',
      'Guadalajara',
      'Baja California',
    ].map((name) => ({ '@type': 'AdministrativeArea', name })),
    sameAs: SITE.social.map((s) => s.href),
    knowsAbout: [
      'Estructura metálica',
      'Ingeniería estructural',
      'Instalaciones',
      'Estructura de concreto',
      'Obra residencial',
      'Carpintería',
      'Supervisión de obra',
    ],
  }
}

export function robotsTxt() {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n')
}

/**
 * Las rutas reales; el 404 no entra.
 *
 * Sin `changefreq` ni `priority`: Google los ignora y lo ha dicho por escrito.
 *
 * `lastmod` SOLO DONDE ES VERDAD. Cada artículo lleva su `_updatedAt` de
 * Sanity (la última vez que se publicó un cambio), y /blog el del artículo
 * editado más recientemente, porque su contenido es ese listado. Las páginas
 * fijas no lo llevan: la fecha del build diría que cambiaron en cada
 * despliegue, y un `lastmod` que miente se deja de mirar.
 */
export function sitemapXml() {
  const ultimoArticulo = POSTS.map((p) => p.updatedAt).sort().at(-1)
  const entradas = [
    ...RUTAS_FIJAS.map((ruta) => ({
      ruta: ruta as string,
      lastmod: ruta === '/blog' ? ultimoArticulo : undefined,
    })),
    ...POSTS.map((p) => ({ ruta: rutaPost(p.slug), lastmod: p.updatedAt })),
  ]
  const urls = entradas
    .map(({ ruta, lastmod }) =>
      lastmod
        ? `  <url><loc>${SITE_URL}${ruta}</loc><lastmod>${lastmod}</lastmod></url>`
        : `  <url><loc>${SITE_URL}${ruta}</loc></url>`,
    )
    .join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}

/** Dónde se publica el feed. Lo enlaza el <head> de /blog y de cada artículo. */
export const RUTA_RSS = '/blog/rss.xml'

const escaparXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** RFC-822, como pide RSS 2.0: "Fri, 13 Nov 2026 17:46:59 GMT". */
const fechaRss = (iso: string) => new Date(iso).toUTCString()

/**
 * EL FEED RSS DEL BLOG (RSS 2.0). Sale del mismo listado que /blog y el
 * sitemap: un artículo no puede estar en uno y faltar en otro.
 *
 * - `description` es el EXTRACTO, no el cuerpo: el feed avisa que hay algo
 *   nuevo, y el artículo se lee en el sitio.
 * - `guid` es el `_id` de Sanity (`isPermaLink="false"`), no la URL: si
 *   alguien corrige el slug, los lectores no lo muestran como artículo nuevo.
 * - `lastBuildDate` es el último cambio publicado, no la hora del build: el
 *   feed no aparenta cambiar en cada despliegue (mismo criterio que el
 *   `lastmod` del sitemap). Sin artículos, la hora del build.
 * - `atom:link rel="self"` lo pide el validador del W3C: dice dónde vive el
 *   feed aunque alguien lo copie o lo sirva desde otro lado.
 */
export function rssXml(ahora = new Date()) {
  const blog = SEO['/blog']
  const ultimoCambio = POSTS.map((p) => p.updatedAt).sort().at(-1)

  const items = POSTS.map((p) => {
    const url = `${SITE_URL}${rutaPost(p.slug)}`
    return [
      '    <item>',
      `      <title>${escaparXml(p.titulo)}</title>`,
      `      <link>${url}</link>`,
      `      <description>${escaparXml(p.extracto)}</description>`,
      `      <pubDate>${fechaRss(p.publishedAt)}</pubDate>`,
      `      <guid isPermaLink="false">archo-blog-${escaparXml(p.id)}</guid>`,
      '    </item>',
    ].join('\n')
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escaparXml(blog.title)}</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <description>${escaparXml(blog.description)}</description>`,
    '    <language>es-MX</language>',
    `    <lastBuildDate>${ultimoCambio ? fechaRss(ultimoCambio) : ahora.toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}${RUTA_RSS}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
