import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Inmuebles from '@/pages/Inmuebles'
import Projects from '@/pages/Projects'
import Services from '@/pages/Services'
import About from '@/pages/About'
import Process from '@/pages/Process'
import Contact from '@/pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        {/* Maqueta con datos ficticios; ver src/data/inmuebles.ts */}
        <Route path="/inmuebles" element={<Inmuebles />} />
        <Route path="/about" element={<About />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
