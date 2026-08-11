import { useMediaQuery } from '@/hooks/useMediaQuery'

/** Devuelve `true` si el usuario pidió reducir el movimiento. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
