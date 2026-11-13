import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@/App'
import '@/index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
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
