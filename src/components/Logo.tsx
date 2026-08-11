import { Link } from 'react-router-dom'
import { SITE } from '@/data/site'

type LogoProps = {
  /** El logo se invierte sobre fondos claros (p. ej. la sección en archo-cream). */
  invert?: boolean
  className?: string
}

/**
 * `touch-target` da los 44px de área táctil sin tocar la caja: el logo mide
 * sus 28px de siempre y el ritmo del footer queda igual que en el original.
 */
export default function Logo({ invert = false, className = '' }: LogoProps) {
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
        style={{ filter: invert ? 'invert(1)' : 'none' }}
        draggable={false}
      />
      <span className="font-display text-base font-medium tracking-[0.28em]">{SITE.name}</span>
    </Link>
  )
}
