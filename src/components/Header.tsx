import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Logo from '@/components/Logo'
import MenuIcon from '@/components/MenuIcon'
import MobileMenu from '@/components/MobileMenu'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { NAV_ITEMS } from '@/data/nav'
import { SITE } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const MENU_ID = 'mobile-menu'

type HeaderProps = {
  /** Controlado desde Layout, que necesita el estado para marcar `inert` el fondo. */
  menuOpen: boolean
  onMenuOpenChange: (open: boolean) => void
}

export default function Header({ menuOpen, onMenuOpenChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const closeMenu = useCallback(() => onMenuOpenChange(false), [onMenuOpenChange])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !menuOpen
            ? 'border-b border-white/5 bg-archo-black/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
          <Logo variant="lockup" />

          <nav className="hidden items-center gap-10 md:flex" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative text-[11px] uppercase tracking-[0.24em] transition-colors hover:text-archo-cream ${
                    isActive ? 'text-archo-cream' : 'text-archo-mist'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`pointer-events-none absolute -bottom-1 left-0 h-px bg-archo-orange transition-all duration-500 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Sustituye al indicador "Estudio abierto · 26". Se pinta con la
              paleta del sitio y no con el verde de marca de WhatsApp, que
              rompería el monocromo. En móvil va sin texto, junto a la
              hamburguesa: es donde más se usa. */}
          <a
            href={SITE.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SITE.whatsapp.a11yLabel}
            className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 border border-white/15 px-3.5 text-[11px] uppercase tracking-[0.24em] text-archo-mist transition-colors hover:border-archo-orange hover:text-archo-cream md:ml-0 md:px-4"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0 text-archo-orange" />
            <span className="hidden md:inline">{SITE.whatsapp.label}</span>
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => onMenuOpenChange(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Menú'}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            className="-mr-3 ml-1 inline-flex h-11 w-11 items-center justify-center text-archo-cream md:hidden"
          >
            <MenuIcon open={menuOpen} reducedMotion={prefersReducedMotion} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} triggerRef={triggerRef} id={MENU_ID} />
    </>
  )
}
