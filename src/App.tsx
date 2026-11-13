import { BrowserRouter } from 'react-router-dom'

import Rutas from '@/Rutas'
import type { Articulo } from '@/data/blog'
import { ArticuloInicial } from '@/lib/articulo'

/**
 * La aplicación en el navegador. La tabla de rutas vive en Rutas.tsx; ver ahí
 * por qué.
 *
 * `articulo` es el cuerpo del artículo embebido en el HTML, si la página es un
 * artículo del blog (ver lib/articulo.ts y main.tsx).
 */
export default function App({ articulo = null }: { articulo?: Articulo | null }) {
  return (
    <ArticuloInicial.Provider value={articulo}>
      <BrowserRouter>
        <Rutas />
      </BrowserRouter>
    </ArticuloInicial.Provider>
  )
}
