import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@/App'
import type { Articulo } from '@/data/blog'
import { ID_DATOS_ARTICULO } from '@/lib/articulo'
import '@/index.css'

const root = document.getElementById('root')!

/**
 * El cuerpo del artículo, si la página es un artículo del blog. Lo embebe el
 * prerender junto al HTML para que el primer render del cliente lo tenga sin
 * esperar a ninguna petición (ver lib/articulo.ts).
 */
function leerArticulo(): Articulo | null {
  const datos = document.getElementById(ID_DATOS_ARTICULO)?.textContent
  if (!datos) return null
  try {
    return JSON.parse(datos) as Articulo
  } catch {
    return null
  }
}

const app = (
  <StrictMode>
    <App articulo={leerArticulo()} />
  </StrictMode>
)

/**
 * Hidrata, no crea. En producción el HTML ya viene pintado desde el build
 * (tools/prerenderizar.mjs), y React tiene que adoptar ese DOM: con
 * `createRoot` lo tiraría y lo reconstruiría, con parpadeo incluido.
 *
 * Hidratar exige que el primer render del cliente coincida con el HTML. Por
 * eso `useMediaQuery`, `useReveal` y `useCountUp` arrancan igual en los dos
 * lados y corrigen después; está explicado en cada hook.
 *
 * En `vite dev` no hay prerender y el contenedor llega vacío: ahí se crea.
 */
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
