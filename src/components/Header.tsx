import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Logo from '@/components/Logo'
import MenuIcon from '@/components/MenuIcon'
import MobileMenu from '@/components/MobileMenu'
import { NAV_ITEMS } from '@/data/nav'
import { SITE } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const MENU_ID = 'mobile-menu'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

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
          <Logo />

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

          <div className="hidden items-center gap-3 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-archo-orange shadow-[0_0_12px_var(--archo-orange)]" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-archo-mist">
              {SITE.statusLabel}
            </span>
          </div>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Menú'}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            className="-mr-3 inline-flex h-11 w-11 items-center justify-center text-archo-cream md:hidden"
          >
            <MenuIcon open={menuOpen} reducedMotion={prefersReducedMotion} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} triggerRef={triggerRef} id={MENU_ID} />
    </>
  )
}
