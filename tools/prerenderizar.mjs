/**
 * PRERENDERIZA LAS RUTAS Y EL 404  ·  corre solo, dentro de `npm run build`
 *
 * Qué arregla. El sitio era una SPA: Vercel servía el mismo index.html vacío
 * en todas las rutas y React lo rellenaba en el navegador. Quien no ejecuta
 * JavaScript (tarjetas de enlace de WhatsApp/LinkedIn, rastreadores que no
 * renderizan o lo hacen tarde) veía siete páginas idénticas, sin texto y con
 * el mismo título. Y el LCP esperaba a que cargara y corriera React.
 *
 * Cómo. Un segundo build de Vite en modo SSR compila src/entry-servidor.tsx,
 * que pinta el mismo árbol con `StaticRouter`. Se escribe un .html por ruta a
 * partir de dist/index.html (la plantilla que ya trae CSS, JS y GA).
 *
 * Sin dependencias nuevas: `react-dom/server` viene en `react-dom` y
 * `StaticRouter` en `react-router-dom`.
 *
 * Archivos planos + `cleanUrls` en vercel.json: Vercel sirve `projects.html`
 * en `/projects` y redirige `/projects.html` a `/projects`. El 404 es
 * `dist/404.html`, que Vercel sirve con estado 404 real; la reescritura
 * anterior respondía 200 a cualquier URL.
 *
 * Cada página lleva su <title>, description, canónica, Open Graph y, en la
 * portada, el JSON-LD; el sitemap.xml y el robots.txt salen de la misma tabla.
 * Todo viene de src/data/seo.ts.
 *
 * Patrón portado de Noventis-website/tools/prerenderizar.mjs.
 */

import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = 'dist'
const PLANTILLA = join(DIST, 'index.html')

/* 1 · Compilar el árbol para servidor.

   Dentro del proyecto y no en el temporal del sistema: el bundle SSR deja
   `react`, `react-dom` y `react-router-dom` como imports externos, y Node los
   resuelve subiendo carpetas desde el archivo. Desde %TEMP% no hay ningún
   node_modules encima y muere con ERR_MODULE_NOT_FOUND. */
const TEMPORAL = resolve('node_modules/.cache/prerender')
rmSync(TEMPORAL, { recursive: true, force: true })
mkdirSync(TEMPORAL, { recursive: true })

execSync(`npx vite build --ssr src/entry-servidor.tsx --outDir "${TEMPORAL}" --logLevel error`, {
  stdio: ['ignore', 'ignore', 'inherit'],
})
const {
  render,
  RUTAS,
  RUTA_RSS,
  SEO_404,
  ID_DATOS_ARTICULO,
  blogPostingJsonLd,
  comprobarRutas,
  metaDeRuta,
  metadatosDe,
  organizacionJsonLd,
  postDeRuta,
  robotsTxt,
  rssXml,
  sitemapXml,
} = await import(pathToFileURL(join(TEMPORAL, 'entry-servidor.js')).href)

/* Antes de escribir nada: el menú y la tabla de metadatos tienen que listar
   las mismas rutas. */
comprobarRutas()

/* El nombre del feed en el <link rel="alternate">: el mismo título que /blog. */
const SEO_BLOG_TITULO = metaDeRuta('/blog').title

/* 2 · Preparar la plantilla. */

const escapar = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const plantilla = readFileSync(PLANTILLA, 'utf8')

/* Los comentarios de index.html no se publican. Documentan decisiones
   (favicon, fuentes, GA, JSON-LD) y se quedan en el fuente, que es donde los
   busca quien va a tocar eso, pero no tienen por qué viajar en cada página.
   Solo sobre la plantilla, nunca sobre el HTML final: React usa comentarios
   como marcadores en el HTML que hidrata. */
const base = plantilla
  .replace(/<!--[\s\S]*?-->\n?\s*/g, '')
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')

/* Los metadatos por ruta salen de seo.ts y solo de ahí. Si alguien vuelve a
   poner uno fijo en index.html, el build se detiene en vez de publicar dos
   descriptions (o dos og:title) en el mismo documento. */
for (const patron of [/<title>/, /name="description"/, /property="og:/, /name="twitter:/, /rel="canonical"/, /application\/ld\+json/]) {
  if (patron.test(base)) {
    throw new Error(`index.html trae una etiqueta que genera seo.ts (${patron}); se duplicaría.`)
  }
}
if (!base.includes('<div id="root"></div>')) {
  throw new Error(`No se encontró <div id="root"></div> en ${PLANTILLA}.`)
}

/**
 * El bloque de datos estructurados. `<` va escapado como `<`: un dato que
 * contuviera `</script>` cerraría la etiqueta antes de tiempo, y
 * `JSON.stringify` no lo escapa solo porque `<` es válido en una cadena JSON.
 */
function bloqueJsonLd(datos) {
  const json = JSON.stringify(datos, null, 2).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">\n${json}\n    </script>`
}

/** El JSON del artículo para hidratar, con el mismo escape de `<` que el JSON-LD. */
function bloqueArticulo(articulo) {
  const json = JSON.stringify(articulo).replace(/</g, '\\u003c')
  return `<script type="application/json" id="${ID_DATOS_ARTICULO}">${json}</script>`
}

/* Cómo escapa React el texto al pintarlo, para buscarlo en el HTML. */
const comoReact = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')

/**
 * EL ARTÍCULO TIENE QUE ESTAR ENTERO EN EL HTML. Es el motivo de prerenderizar
 * el blog: si el cuerpo llegara por JS, quien no lo ejecuta vería un artículo
 * vacío. Se comprueba bloque a bloque que el texto de cada uno aparece en la
 * página, y que no quedó el aviso de "Cargando".
 */
function comprobarArticulo(ruta, html, articulo) {
  if (html.includes('Cargando el artículo')) {
    throw new Error(`${ruta}: el cuerpo no se prerenderizó (quedó el aviso de carga).`)
  }
  for (const bloque of articulo.cuerpo) {
    if (bloque._type !== 'block') continue
    const texto = (bloque.children ?? [])
      .find((c) => c.text?.trim())
      ?.text.split('\n')[0]
      .slice(0, 40)
    if (texto && !html.includes(comoReact(texto))) {
      throw new Error(`${ruta}: falta en el HTML el bloque que empieza por "${texto}".`)
    }
  }
}

function documento(ruta, meta, { es404 = false, articulo = null } = {}) {
  const cuerpo = render(ruta, articulo)
  if (!cuerpo.includes('<main')) throw new Error(`El HTML de ${ruta} salió sin <main>.`)
  if (articulo) comprobarArticulo(ruta, cuerpo, articulo)

  const post = es404 ? undefined : postDeRuta(ruta)
  const datos = metadatosDe(ruta, meta, es404)
  const cabecera = [
    `<title>${escapar(datos.title)}</title>`,
    ...(datos.canonical ? [`<link rel="canonical" href="${escapar(datos.canonical)}" />`] : []),
    /* El feed, en el listado y en cada artículo: así lo encuentran solos los
       lectores RSS y las extensiones que buscan feeds. */
    ...(ruta === '/blog' || post
      ? [`<link rel="alternate" type="application/rss+xml" title="${escapar(SEO_BLOG_TITULO)}" href="${RUTA_RSS}" />`]
      : []),
    ...datos.nombradas.map(([k, v]) => `<meta name="${k}" content="${escapar(v)}" />`),
    ...datos.propiedades.map(([k, v]) => `<meta property="${k}" content="${escapar(v)}" />`),
    /* La entidad de la empresa, solo en la portada; el porqué está en seo.ts. */
    ...(ruta === '/' ? [bloqueJsonLd(organizacionJsonLd())] : []),
    ...(post ? [bloqueJsonLd(blogPostingJsonLd(post))] : []),
  ]
    .map((linea) => `    ${linea}\n`)
    .join('')

  return base
    .replace('</head>', `${cabecera}  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${cuerpo}</div>${articulo ? `\n    ${bloqueArticulo(articulo)}` : ''}`,
    )
}

/* 3 · Un archivo por ruta. La portada se queda como index.html. */

const escritos = []
const escribir = (archivo, html) => {
  const destino = join(DIST, archivo)
  mkdirSync(dirname(destino), { recursive: true })
  writeFileSync(destino, html)
  escritos.push([archivo, html.length])
}

/* Los artículos van en dist/blog/<slug>.html, junto a dist/blog.html (el
   listado); con cleanUrls, Vercel los sirve en /blog/<slug> y /blog. El
   cuerpo de cada uno lo dejó tools/traer-blog.mjs en public/datos/blog/, y
   Vite lo copió a dist/. */
for (const ruta of RUTAS) {
  const post = postDeRuta(ruta)
  const articulo = post
    ? JSON.parse(readFileSync(join(DIST, 'datos', 'blog', `${post.slug}.json`), 'utf8'))
    : null
  escribir(ruta === '/' ? 'index.html' : `${ruta.slice(1)}.html`, documento(ruta, metaDeRuta(ruta), { articulo }))
}

/* El 404 se pinta contra una ruta que no existe, para que el router caiga en
   el comodín. */
escribir('404.html', documento('/__404__', SEO_404, { es404: true }))

/* 4 · Lo que leen los rastreadores y no los visitantes. Sale de la misma
   tabla que el HTML, así que no puede listar una ruta que ya no existe. */
const paginas = escritos.length
escribir('sitemap.xml', sitemapXml())
escribir('robots.txt', robotsTxt())
escribir(RUTA_RSS.slice(1), rssXml())

rmSync(TEMPORAL, { recursive: true, force: true })

const ancho = Math.max(...escritos.map(([a]) => a.length)) + 2
for (const [archivo, bytes] of escritos) {
  console.log(`  ${DIST}/${archivo.padEnd(ancho)} ${String(bytes).padStart(7)} B`)
}
console.log(`\n${paginas} páginas prerenderizadas, más sitemap.xml, robots.txt y ${RUTA_RSS.slice(1)}.`)
