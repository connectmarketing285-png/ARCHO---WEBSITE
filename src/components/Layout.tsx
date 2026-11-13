import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { trackPageView, trackWhatsAppClicks } from '@/lib/analytics'
import { marcarPrimeraCargaTerminada } from '@/lib/hidratacion'
import { pageTitle } from '@/lib/page-title'

/** React Router no reinicia el scroll al navegar; sin esto la ruta nueva abre a media página. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

/**
 * Título del documento y vista de página en GA4 en cada cambio de ruta.
 * Van juntos y en este orden porque la vista toma el título de `document.title`.
 */
function PageView() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = pageTitle(pathname)
    trackPageView()
  }, [pathname])

  return null
}

export default function Layout() {
  // El estado del menú vive aquí, y no en Header, porque quien tiene que
  // quedar inerte mientras está abierto es el contenido de la página —
  // hermano del Header, no hijo suyo.
  const [menuOpen, setMenuOpen] = useState(false)

  // El Layout envuelve todas las rutas: un solo listener cubre cada enlace de
  // WhatsApp del sitio.
  useEffect(() => trackWhatsAppClicks(), [])

  // A partir de aquí, lo que se monte entra animado (ver lib/hidratacion.ts).
  useEffect(() => marcarPrimeraCargaTerminada(), [])

  return (
    <div className="relative min-h-screen bg-archo-black text-archo-cream">
      <ScrollToTop />
      <PageView />

      <a
        href="#contenido"
        inert={menuOpen}
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[60] focus:bg-archo-ink focus:px-4 focus:py-3 focus:text-sm focus:text-archo-cream"
      >
        Saltar al contenido
      </a>

      <Header menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />

      {/* `inert` saca todo el fondo del orden de tabulación y del árbol de
          accesibilidad mientras el overlay está abierto. Complementa al focus
          trap del MobileMenu: el trap evita que el foco se escape, e `inert`
          hace que además no exista para un lector de pantalla. */}
      <div inert={menuOpen}>
        <main id="contenido">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
