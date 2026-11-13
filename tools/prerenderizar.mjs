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
 * Patrón portado de Noventis-website/tools/prerenderizar.mjs. Los metadatos
 * por ruta (description, og, canonical) y el sitemap generado son la fase
 * siguiente; aquí solo cambia el <title>, que ya cambiaba en el cliente.
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
const { render, RUTAS, pageTitle } = await import(
  pathToFileURL(join(TEMPORAL, 'entry-servidor.js')).href
)

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

if (/<title>/.test(base)) throw new Error('Quedó un <title> en la plantilla; se duplicaría.')
if (!base.includes('<div id="root"></div>')) {
  throw new Error(`No se encontró <div id="root"></div> en ${PLANTILLA}.`)
}

function documento(ruta, { es404 = false } = {}) {
  const cuerpo = render(ruta)
  if (!cuerpo.includes('<main')) throw new Error(`El HTML de ${ruta} salió sin <main>.`)

  const cabecera = [
    `<title>${escapar(pageTitle(ruta))}</title>`,
    /* La página de error no se indexa, pero sus enlaces sí se siguen. */
    ...(es404 ? ['<meta name="robots" content="noindex, follow" />'] : []),
  ]
    .map((linea) => `    ${linea}\n`)
    .join('')

  return base
    .replace('</head>', `${cabecera}  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${cuerpo}</div>`)
}

/* 3 · Un archivo por ruta. La portada se queda como index.html. */

const escritos = []
const escribir = (archivo, html) => {
  const destino = join(DIST, archivo)
  mkdirSync(dirname(destino), { recursive: true })
  writeFileSync(destino, html)
  escritos.push([archivo, html.length])
}

for (const ruta of RUTAS) {
  escribir(ruta === '/' ? 'index.html' : `${ruta.slice(1)}.html`, documento(ruta))
}

/* El 404 se pinta contra una ruta que no existe, para que el router caiga en
   el comodín. */
escribir('404.html', documento('/__404__', { es404: true }))

rmSync(TEMPORAL, { recursive: true, force: true })

for (const [archivo, bytes] of escritos) {
  console.log(`  ${DIST}/${archivo.padEnd(16)} ${String(bytes).padStart(7)} B`)
}
console.log(`\n${escritos.length} páginas prerenderizadas.`)
