import { Route, Routes } from 'react-router-dom'

import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import Services from '@/pages/Services'
import About from '@/pages/About'
import Process from '@/pages/Process'
import Contact from '@/pages/Contact'

// Fase 4: envolver las rutas en un <Layout> con Header + MobileMenu + Footer.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/process" element={<Process />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}
