import { BrowserRouter } from 'react-router-dom'

import Rutas from '@/Rutas'

/** La aplicación en el navegador. La tabla de rutas vive en Rutas.tsx; ver ahí por qué. */
export default function App() {
  return (
    <BrowserRouter>
      <Rutas />
    </BrowserRouter>
  )
}
