const EASING = 'cubic-bezier(.22, 1, .36, 1)'

type MenuIconProps = {
  open: boolean
  /** Sin transición cuando el usuario pidió reducir el movimiento. */
  reducedMotion?: boolean
}

/**
 * Hamburguesa ↔ cierre. Son los dos mismos paths del original
 * (M3 7h18 / M3 17h18) transformados hasta cruzarse en el centro,
 * no un intercambio de íconos.
 *
 * El orden `rotate() translateY()` importa: CSS aplica de derecha a
 * izquierda, así que primero la línea baja al centro (12) y después gira
 * sobre él. Al revés giraría en su sitio y quedaría descentrada.
 */
export default function MenuIcon({ open, reducedMotion = false }: MenuIconProps) {
  const pathStyle = {
    transformOrigin: '12px 12px',
    transition: reducedMotion ? 'none' : `transform 500ms ${EASING}`,
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          ...pathStyle,
          transform: open ? 'rotate(45deg) translateY(5px)' : 'none',
        }}
      />
      <path
        d="M3 17h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          ...pathStyle,
          transform: open ? 'rotate(-45deg) translateY(-5px)' : 'none',
        }}
      />
    </svg>
  )
}
