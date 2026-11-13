import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import Services from '@/pages/Services'
import About from '@/pages/About'
import Process from '@/pages/Process'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import NotFound from '@/pages/NotFound'

/**
 * La tabla de rutas, sin router alrededor.
 *
 * Tiene dos consumidores y solo puede haber una tabla:
 *
 *   App.tsx               la envuelve en <BrowserRouter> para el navegador
 *   entry-servidor.tsx    la envuelve en <StaticRouter> para el prerenderizado
 *
 * Si cada uno declarara sus rutas, una página nueva podría existir en el
 * navegador y no en el HTML generado, o al revés.
 *
 * El comodín cubre dos casos: `dist/404.html` (el prerender lo pinta contra
 * una ruta inexistente) y los enlaces rotos dentro del sitio, donde el router
 * cambia de ruta sin pasar por el servidor.
 */
export default function Rutas() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
