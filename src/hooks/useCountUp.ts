import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { esPrimeraCarga } from '@/lib/hidratacion'

const DURATION = 1800

/** El mismo pliegue que `useReveal`: lo que está por encima ya se ve al cargar. */
const FOLD = 0.88

/** easeOutCubic: arranca rápido y frena al final, como el contador del original. */
const easeOut = (progress: number) => 1 - (1 - progress) ** 3

/**
 * Cuenta de 0 al valor objetivo cuando el elemento entra en viewport.
 *
 * El estado inicial es la cifra FINAL, no 0: es lo que va en el HTML
 * prerenderizado (un "0+ proyectos" en el HTML es lo que leerían buscadores y
 * tarjetas de enlace) y lo que pinta el primer render del cliente, para que la
 * hidratación coincida. En un efecto de layout, antes del pintado, se baja a 0
 * solo si el contador está bajo el pliegue: ahí nadie lo ve todavía. Si ya
 * está en pantalla al cargar, se queda con la cifra final sin animar.
 *
 * Mismo criterio que `useReveal`: con `prefers-reduced-motion` no se anima.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  target: number,
  duration = DURATION,
) {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(target)
  const animate = useRef(false)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) return

    if (!esPrimeraCarga() || element.getBoundingClientRect().top >= window.innerHeight * FOLD) {
      animate.current = true
      setValue(0)
    }
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element || !animate.current) return

    let frame = 0

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          setValue(Math.round(easeOut(progress) * target))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration])

  return [ref, value] as const
}
