import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

/** React Router no reinicia el scroll al navegar; sin esto la ruta nueva abre a media página. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-archo-black text-archo-cream">
      <ScrollToTop />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[60] focus:bg-archo-ink focus:px-4 focus:py-3 focus:text-sm focus:text-archo-cream"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
