import { useEffect, useRef, useState } from 'react'

/**
 * Devuelve `true` la primera vez que el elemento se acerca al viewport, y ya
 * no vuelve atrás. Sirve para no montar hasta entonces lo que sea caro.
 *
 * `loading="lazy"` no basta para un iframe de terceros: en conexiones rápidas
 * Chrome usa un margen muy generoso y acaba trayéndolo en la carga inicial.
 * Con esto el elemento sencillamente no existe en el DOM hasta que hace falta.
 */
export function useNearViewport<T extends HTMLElement = HTMLDivElement>(rootMargin = '300px') {
  const ref = useRef<T>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setNear(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, near] as const
}
