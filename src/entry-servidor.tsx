import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import Rutas from '@/Rutas'
import { NAV_ITEMS } from '@/data/nav'
import { pageTitle } from '@/lib/page-title'

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

/** Las rutas a prerenderizar: las del menú, que hoy son todas las del sitio. */
export const RUTAS: readonly string[] = NAV_ITEMS.map((item) => item.to)

export { pageTitle }
