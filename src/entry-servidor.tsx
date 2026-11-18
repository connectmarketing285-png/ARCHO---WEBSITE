/* oxlint-disable react/only-export-components -- este archivo no lo carga nunca el servidor de desarrollo; ver abajo. */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import Rutas from '@/Rutas'
import type { Articulo } from '@/data/blog'
import { ArticuloInicial } from '@/lib/articulo'

/**
 * Entrada del prerenderizado. La usa tools/prerenderizar.mjs en el build y
 * nunca llega al navegador.
 *
 * `StaticRouter` en vez de `BrowserRouter`: aquí no hay historial, la ruta se
 * pasa como argumento. Es el mismo árbol y la misma tabla de rutas que ve el
 * visitante.
 *
 * `articulo` es el cuerpo del artículo cuando la ruta es /blog/<slug>: así el
 * artículo completo queda en el HTML (ver lib/articulo.ts).
 *
 * Funciona porque nada toca `window` ni `document` durante el render, solo
 * dentro de efectos, que aquí no corren. Si algún día un componente lee el DOM
 * al renderizar, el build falla aquí y no en producción.
 */
export function render(ruta: string, articulo: Articulo | null = null): string {
  return renderToString(
    <ArticuloInicial.Provider value={articulo}>
      <StaticRouter location={ruta}>
        <Rutas />
      </StaticRouter>
    </ArticuloInicial.Provider>,
  )
}

/* La tabla de metadatos viaja en el mismo bundle: un solo build SSR. La regla
   de Fast Refresh no aplica: este archivo no lo carga nunca el servidor de
   desarrollo. */
export {
  RUTAS,
  RUTA_RSS,
  SEO_404,
  blogPostingJsonLd,
  comprobarRutas,
  metaDeRuta,
  metadatosDe,
  organizacionJsonLd,
  postDeRuta,
  robotsTxt,
  rssXml,
  sitemapXml,
} from '@/data/seo'
export { ID_DATOS_ARTICULO } from '@/lib/articulo'
