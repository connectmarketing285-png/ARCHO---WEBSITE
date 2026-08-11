import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const DURATION = 1800

/** easeOutCubic: arranca rápido y frena al final, como el contador del original. */
const easeOut = (progress: number) => 1 - (1 - progress) ** 3

/**
 * Cuenta de 0 al valor objetivo cuando el elemento entra en viewport.
 *
 * Mismo criterio que `useReveal`: con `prefers-reduced-motion` no se anima ni se
 * observa nada, la cifra final se pinta de inmediato.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  target: number,
  duration = DURATION,
) {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setValue(target)
      return
    }

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
  }, [target, duration, prefersReducedMotion])

  return [ref, value] as const
}
