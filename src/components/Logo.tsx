import { Link } from 'react-router-dom'
import { SITE } from '@/data/site'

type LogoProps = {
  /**
   * `lockup` pinta el logotipo completo del cliente, que ya incluye el nombre
   * y "CONSTRUCTORA": se usa en el nav y no lleva texto al lado.
   * `isotipo` pinta solo la marca acompañada del nombre en tipografía, que es
   * como aparece en el pie.
   */
  variant?: 'isotipo' | 'lockup'
  /** El logo se invierte sobre fondos claros (p. ej. la sección en archo-cream). */
  invert?: boolean
  className?: string
}

/**
 * `touch-target` da los 44px de área táctil sin tocar la caja: el logo mantiene
 * su altura y el ritmo del header y del footer queda igual.
 */
export default function Logo({ variant = 'isotipo', invert = false, className = '' }: LogoProps) {
  const filter = invert ? 'invert(1)' : 'none'

  if (variant === 'lockup') {
    return (
      <Link
        to="/"
        aria-label={SITE.name}
        className={`touch-target inline-flex items-center ${className}`.trim()}
      >
        {/* 40/48px: el lockup apila ARCHO, CONSTRUCTORA y S.A de C.V junto al
            isotipo, así que a 36px la línea del nombre se quedaba corta. */}
        <img
          src={SITE.lockup}
          alt={SITE.name}
          width={555}
          height={200}
          className="h-10 w-auto select-none object-contain md:h-12"
          style={{ filter }}
          draggable={false}
        />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      className={`touch-target inline-flex items-center gap-3 text-archo-cream ${className}`.trim()}
    >
      <img
        src={SITE.logo}
        alt={SITE.name}
        width={901}
        height={1100}
        className="h-7 w-auto select-none object-contain"
        style={{ filter }}
        draggable={false}
      />
      <span className="font-display text-base font-medium tracking-[0.28em]">{SITE.name}</span>
    </Link>
  )
}
