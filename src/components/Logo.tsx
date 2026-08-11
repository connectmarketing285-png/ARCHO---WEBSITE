import { Link } from 'react-router-dom'
import { SITE } from '@/data/site'

type LogoProps = {
  /** El logo se invierte sobre fondos claros (p. ej. la sección en archo-cream). */
  invert?: boolean
  className?: string
}

/**
 * `min-h-11` da el área táctil de 44px que pide el brief en móvil; en desktop
 * vuelve a la altura del logo (28px) para no alterar el ritmo del original.
 */
export default function Logo({ invert = false, className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex min-h-11 items-center gap-3 text-archo-cream md:min-h-0 ${className}`.trim()}
    >
      <img
        src={SITE.logo}
        alt={SITE.name}
        width={28}
        height={28}
        className="h-7 w-7 select-none object-contain"
        style={{ filter: invert ? 'invert(1)' : 'none' }}
        draggable={false}
      />
      <span className="font-display text-base font-medium tracking-[0.28em]">{SITE.name}</span>
    </Link>
  )
}
