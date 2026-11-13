import { FOUNDED_YEAR } from '@/data/about'
import { NAV_ITEMS } from '@/data/nav'
import { SITE } from '@/data/site'

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

export const RUTAS = Object.keys(SEO) as Ruta[]

export function esRuta(pathname: string): pathname is Ruta {
  return Object.hasOwn(SEO, pathname)
}

/** Lo que usa Layout al navegar: el título de la ruta, o el del 404. */
export function pageTitle(pathname: string) {
  return esRuta(pathname) ? SEO[pathname].title : SEO_404.title
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
  const sobran = RUTAS.filter((r) => !menu.includes(r))
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
      ['og:type', 'website'],
      ['og:site_name', SITE.name],
      ['og:locale', 'es_MX'],
      ['og:title', meta.title],
      ['og:description', meta.description],
      ...(url ? [['og:url', url]] : []),
      ['og:image', `${SITE_URL}${OG_IMAGE.path}`],
      ['og:image:width', String(OG_IMAGE.width)],
      ['og:image:height', String(OG_IMAGE.height)],
      ['og:image:alt', OG_IMAGE.alt],
    ] as [string, string][],
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
 * Sin `changefreq` ni `priority`: Google los ignora y lo ha dicho por escrito
 * (el sitemap anterior traía `priority`). Sin `lastmod` en las páginas fijas:
 * la fecha del build diría que el contenido cambió en cada despliegue, y un
 * `lastmod` que miente se deja de mirar. Entrará con el blog, donde sí hay
 * fechas reales de publicación y edición.
 */
export function sitemapXml() {
  const urls = RUTAS.map((ruta) => `  <url><loc>${SITE_URL}${ruta}</loc></url>`).join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}
