import { useEffect, useRef } from 'react'

type UseRevealOptions = {
  /** Fracción del elemento visible que dispara el reveal. */
  threshold?: number
  /** Margen del root. El negativo abajo hace que dispare un poco antes del borde. */
  rootMargin?: string
  /** Si es `false`, el elemento vuelve a ocultarse al salir del viewport. */
  once?: boolean
}

const DEFAULTS = {
  threshold: 0,
  // Dispara cuando el borde superior del elemento cruza el 88% del viewport.
  // Se usa rootMargin en vez de threshold alto para que funcione igual en
  // secciones más altas que la pantalla.
  rootMargin: '0px 0px -12% 0px',
  once: true,
} satisfies Required<UseRevealOptions>

/**
 * Añade la clase `is-visible` al elemento cuando entra en el viewport.
 * La animación vive en CSS (`.reveal` / `.reveal.is-visible`); esto solo
 * conmuta la clase.
 *
 * Con `prefers-reduced-motion` no se observa nada: el elemento se marca
 * visible de inmediato. El CSS además anula la transición, así que aunque
 * el JS no llegara a correr el contenido nunca queda invisible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
) {
  const { threshold, rootMargin, once } = { ...DEFAULTS, ...options }
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      element.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}
