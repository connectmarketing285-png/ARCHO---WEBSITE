import { useEffect, useLayoutEffect, useRef } from 'react'

import { esPrimeraCarga } from '@/lib/hidratacion'

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

/** El mismo 88% del rootMargin por defecto, para decidir antes del primer pintado. */
const FOLD = 0.88

/**
 * Aparición al entrar en el viewport. La animación vive en CSS: `.reveal` es
 * el estado visible y `.reveal.is-pending` el oculto; esto solo quita y pone
 * `is-pending`.
 *
 * El elemento arranca VISIBLE, en el HTML prerenderizado y en el primer render
 * del cliente. Antes arrancaba oculto por CSS y era el JS quien lo mostraba:
 * con el HTML ya pintado desde el build, eso dejaba todo el texto de la página
 * invisible hasta que React cargaba, y el LCP (el wordmark del hero) esperaba
 * al JS y a un segundo de transición.
 *
 * Ahora, en un efecto de layout (antes de que el navegador pinte tras la
 * hidratación), solo se ocultan los elementos que están por debajo del
 * pliegue. Esos no los ve nadie todavía, así que ocultarlos no parpadea, y
 * siguen animando al llegar a ellos. Lo que ya está en pantalla al cargar se
 * queda como está, sin animación de entrada. En las navegaciones internas no
 * hay HTML previo y todo vuelve a entrar animado (ver lib/hidratacion.ts).
 *
 * Con `prefers-reduced-motion`, o sin IntersectionObserver, no se oculta nada.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
) {
  const { threshold, rootMargin, once } = { ...DEFAULTS, ...options }
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) return

    if (!esPrimeraCarga() || element.getBoundingClientRect().top >= window.innerHeight * FOLD) {
      element.classList.add('is-pending')
    }
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!element.classList.contains('is-pending') && once) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-pending')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.add('is-pending')
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
