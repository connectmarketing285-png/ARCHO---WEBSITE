/**
 * GENERA LA TARJETA DE ENLACE  ·  public/og/archo.png, 1200x630
 *
 *   npm run og
 *
 * Lo que enseñan WhatsApp, LinkedIn, Slack o X al pegar un enlace del sitio.
 * Sin `og:image` cada uno improvisa: un recorte de la primera imagen que
 * encuentre, o nada. La que había en index.html apuntaba a un preview de
 * Lovable en r2.dev y estaba comentada.
 *
 * NO CORRE EN EL BUILD. Necesita un Chrome o Edge local, que Vercel no tiene,
 * y la tarjeta solo cambia si cambia la marca. El PNG se versiona en public/.
 * Se vuelve a generar a mano si cambian los colores, el isotipo o el lema.
 *
 * UNA PARA TODO EL SITIO, no una por ruta: la tarjeta presenta a ARCHO, y el
 * título de cada página ya viaja en `og:title` junto a la imagen. El blog
 * traerá la imagen principal de cada artículo.
 *
 * POR QUÉ SE DIBUJA EN EL NAVEGADOR. Tiene que ser PNG (ni WhatsApp ni X
 * aceptan SVG en og:image), y Chrome sin ventana hace la captura con
 * `--screenshot` sin instalar ninguna librería de imagen. Mismo enfoque que
 * Noventis-website/tools/generar-og.mjs, sin el protocolo de depuración.
 *
 * LOS COLORES Y TEXTOS SE LEEN DEL SITIO (src/index.css, src/data/site.ts y
 * src/data/home.ts), no se copian: así la tarjeta no puede anunciar una paleta
 * o un lema que el sitio ya no usa.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ANCHO = 1200
const ALTO = 630
const DESTINO = resolve('public/og/archo.png')

/* 1 · El navegador. CHROME_PATH manda; si no, las rutas habituales en Windows. */
const NAVEGADORES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean)
const navegador = NAVEGADORES.find((ruta) => existsSync(ruta))
if (!navegador) {
  throw new Error('No se encontró Chrome ni Edge. Indica la ruta con CHROME_PATH.')
}

/* 2 · Colores y textos, leídos del sitio. */
const leer = (archivo, patron, nombre) => {
  const m = patron.exec(readFileSync(archivo, 'utf8'))
  if (!m) throw new Error(`No se encontró ${nombre} en ${archivo}.`)
  return m[1]
}
const css = 'src/index.css'
const color = (token) => leer(css, new RegExp(`--color-archo-${token}:\\s*([^;]+);`), `--color-archo-${token}`)
const negro = color('black')
const crema = color('cream')
const niebla = color('mist')
const naranja = color('orange')

/* "ARCHO — Diseño y construcción, un solo proceso." → el lema va tras la raya. */
const titulo = leer('src/data/site.ts', /title:\s*'([^']+)'/, 'SITE.title')
const lema = titulo.split(' — ')[1]
if (!lema) throw new Error(`SITE.title no tiene la forma "ARCHO — lema": ${titulo}`)
const [lemaLead, lemaAccent] = lema.split(/,\s*/)
const cobertura = leer('src/data/site.ts', /coverage:\s*\n?\s*'([^']+)'/, 'SITE.coverage')
const eyebrow = leer('src/data/home.ts', /eyebrow:\s*'([^']+)'/, 'HOME.hero.eyebrow')

const isotipo = pathToFileURL(resolve('public/archo-isotipo.png')).href

/* 3 · La tarjeta. Los mismos elementos que el hero de la home: retícula de
   plano, eyebrow con el punto naranja, wordmark en Poppins 800 y el título
   mixto (normal + cursiva ligera en niebla) que el sitio usa en cada H1. */
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;1,300&family=Inter:wght@400;500&family=Poppins:wght@800&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${ANCHO}px; height: ${ALTO}px; overflow: hidden; }
  body {
    position: relative;
    background: ${negro};
    color: ${crema};
    font-family: 'Inter', sans-serif;
    padding: 72px 80px 64px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  /* La .blueprint-grid del sitio, con el mismo paso de 80px. */
  .reticula {
    position: absolute; inset: 0; opacity: 0.6;
    background-image:
      linear-gradient(90deg, #ffffff0a 1px, transparent 1px),
      linear-gradient(#ffffff0a 1px, transparent 1px);
    background-size: 80px 80px;
  }
  /* El isotipo, a la derecha y a sangre, como la marca de agua del hero pero
     legible: a tamaño de miniatura es lo que identifica a ARCHO. */
  .isotipo {
    position: absolute; right: 80px; top: 50%;
    height: 330px; transform: translateY(-50%);
  }
  .contenido { position: relative; }
  .eyebrow {
    font-size: 17px; letter-spacing: 0.3em; text-transform: uppercase; color: ${niebla};
    display: flex; align-items: center; gap: 16px;
  }
  .punto {
    width: 9px; height: 9px; border-radius: 50%;
    background: ${naranja}; box-shadow: 0 0 14px ${naranja};
  }
  .wordmark {
    font-family: 'Poppins', sans-serif; font-weight: 800;
    font-size: 176px; line-height: 0.82; letter-spacing: -0.02em;
    margin-top: 8px;
  }
  .lema {
    font-family: 'Inter Tight', sans-serif; font-size: 40px; line-height: 1.1;
    letter-spacing: -0.02em; margin-top: 32px; white-space: nowrap;
  }
  .lema em { font-style: italic; font-weight: 300; color: ${niebla}; }
  .cobertura { position: relative; font-size: 19px; color: ${niebla}; letter-spacing: 0.02em; }
</style></head>
<body>
  <div class="reticula"></div>
  <img class="isotipo" src="${isotipo}" alt="">
  <div class="contenido eyebrow"><span class="punto"></span>${eyebrow}</div>
  <div class="contenido">
    <div class="wordmark">ARCHO</div>
    <div class="lema">${lemaLead},${lemaAccent ? ` <em>${lemaAccent}</em>` : ''}</div>
  </div>
  <div class="cobertura">${cobertura}</div>
</body></html>`

/* 4 · Capturar. `--virtual-time-budget` deja que lleguen las fuentes de Google
   antes de la foto; con `display=block` el texto no se pinta en la fuente de
   sistema mientras tanto. */
const tmp = mkdtempSync(join(tmpdir(), 'archo-og-'))
const pagina = join(tmp, 'og.html')
const captura = join(tmp, 'og.png')
writeFileSync(pagina, html)

execFileSync(
  navegador,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${ANCHO},${ALTO}`,
    '--virtual-time-budget=8000',
    '--allow-file-access-from-files',
    `--screenshot=${captura}`,
    pathToFileURL(pagina).href,
  ],
  { stdio: 'ignore' },
)

if (!existsSync(captura)) throw new Error('El navegador no escribió la captura.')
mkdirSync(resolve('public/og'), { recursive: true })
writeFileSync(DESTINO, readFileSync(captura))
rmSync(tmp, { recursive: true, force: true })

const png = readFileSync(DESTINO)
const [w, h] = [png.readUInt32BE(16), png.readUInt32BE(20)]
if (w !== ANCHO || h !== ALTO) throw new Error(`La captura salió de ${w}x${h}, no ${ANCHO}x${ALTO}.`)
console.log(`  public/og/archo.png  ${w}x${h}  ${(statSync(DESTINO).size / 1024).toFixed(0)} KB`)
