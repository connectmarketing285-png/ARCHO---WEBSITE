/* oxlint-disable react/only-export-components -- este archivo no lo carga nunca el servidor de desarrollo; ver abajo. */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import Rutas from '@/Rutas'

/**
 * Entrada del prerenderizado. La usa tools/prerenderizar.mjs en el build y
 * nunca llega al navegador.
 *
 * `StaticRouter` en vez de `BrowserRouter`: aquí no hay historial, la ruta se
 * pasa como argumento. Es el mismo árbol y la misma tabla de rutas que ve el
 * visitante.
 *
 * Funciona porque nada toca `window` ni `document` durante el render, solo
 * dentro de efectos, que aquí no corren. Si algún día un componente lee el DOM
 * al renderizar, el build falla aquí y no en producción.
 */
export function render(ruta: string): string {
  return renderToString(
    <StaticRouter location={ruta}>
      <Rutas />
    </StaticRouter>,
  )
}

/* La tabla de metadatos viaja en el mismo bundle: un solo build SSR. La regla
   de Fast Refresh no aplica: este archivo no lo carga nunca el servidor de
   desarrollo. */
export {
  RUTAS,
  SEO,
  SEO_404,
  comprobarRutas,
  metadatosDe,
  organizacionJsonLd,
  robotsTxt,
  sitemapXml,
} from '@/data/seo'
