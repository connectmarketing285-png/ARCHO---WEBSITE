import { useCallback, useSyncExternalStore } from 'react'

/**
 * Suscripción a una media query, con re-render cuando cambia.
 *
 * `useSyncExternalStore` y no `useState(matchMedia(...))`: el HTML se
 * prerenderiza en el build, donde no hay pantalla, y ahí la respuesta es
 * siempre `false` (`getServerSnapshot`). Durante la hidratación React usa ese
 * mismo valor, de modo que el primer render coincide con el HTML, y justo
 * después vuelve a pintar con el valor real del dispositivo. Leerlo en el
 * estado inicial daba `true` en el cliente frente a `false` en el HTML: un
 * error de hidratación en cada escritorio.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
