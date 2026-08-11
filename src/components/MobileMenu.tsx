import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { NAV_ITEMS } from '@/data/nav'
import { SITE } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const EASING = 'cubic-bezier(.22, 1, .36, 1)'
const STAGGER_MS = 70

/**
 * Elementos que pueden recibir foco dentro del overlay. Se consulta en cada
 * Tab en vez de cachearse: así el trap sigue siendo correcto aunque el
 * contenido cambie mientras el menú está abierto.
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  /** Para devolverle el foco al cerrar. */
  triggerRef: RefObject<HTMLButtonElement | null>
  /** Id que el botón referencia con aria-controls. */
  id: string
}

export default function MobileMenu({ open, onClose, triggerRef, id }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { pathname } = useLocation()

  // Cerrar automáticamente al navegar a otra ruta.
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Foco, Escape y scroll del body. Todo en un efecto para que el cleanup
  // deshaga exactamente lo que hizo el setup, sin estados a medias.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return

    // Se captura al abrir: es el elemento al que hay que devolver el foco,
    // y leer triggerRef.current en el cleanup daría el valor de ese momento.
    const trigger = triggerRef.current

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => element.offsetWidth > 0 || element.offsetHeight > 0,
      )

    // Mueve el foco dentro del overlay al abrir; si no, el siguiente Tab
    // seguiría en el header, detrás del menú.
    getFocusable()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      const insideDialog = active instanceof Node && dialog.contains(active)

      // El ciclo se cierra a mano en los dos extremos. `!insideDialog` cubre
      // el caso de que el foco se haya escapado (clic fuera, foco perdido en
      // <body>): el siguiente Tab lo trae de vuelta en lugar de saltar al
      // contenido de atrás.
      if (event.shiftKey && (active === first || !insideDialog)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !insideDialog)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [open, onClose, triggerRef])

  return (
    <div
      ref={dialogRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      inert={!open}
      className={`fixed inset-0 z-40 bg-archo-black transition-opacity duration-500 md:hidden ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      style={{ transitionTimingFunction: EASING }}
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24">
        <nav aria-label="Navegación principal">
          <ul>
            {NAV_ITEMS.map((item, index) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="group flex items-baseline gap-4 py-3"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open || prefersReducedMotion ? 'none' : 'translateY(16px)',
                    transition: `opacity 600ms ${EASING}, transform 600ms ${EASING}`,
                    transitionDelay:
                      open && !prefersReducedMotion ? `${index * STAGGER_MS}ms` : '0ms',
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span className="text-[11px] tabular-nums tracking-[0.24em] text-archo-mist">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="relative">
                        <span
                          className={`font-display text-3xl uppercase tracking-[0.06em] transition-colors duration-500 ${
                            isActive ? 'text-archo-cream' : 'text-archo-mist'
                          } group-hover:text-archo-cream`}
                        >
                          {item.label}
                        </span>
                        {/* Mismo underline naranja del nav desktop, ya expandido en la ruta activa. */}
                        <span
                          className={`pointer-events-none absolute -bottom-1 left-0 h-px bg-archo-orange transition-all duration-500 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="mt-auto pt-12"
          style={{
            opacity: open ? 1 : 0,
            transition: `opacity 600ms ${EASING}`,
            transitionDelay:
              open && !prefersReducedMotion ? `${NAV_ITEMS.length * STAGGER_MS}ms` : '0ms',
          }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">Estudio</p>
          <address className="mt-5 space-y-1 text-sm not-italic text-archo-cream">
            <p>{SITE.address.street}</p>
            <p>{SITE.address.city}</p>
          </address>
          <div className="mt-4 flex flex-col">
            <a
              href={SITE.phone.href}
              className="inline-flex min-h-11 items-center text-sm text-archo-mist transition-colors hover:text-archo-cream"
            >
              {SITE.phone.display}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-11 items-center text-sm text-archo-mist transition-colors hover:text-archo-cream"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
