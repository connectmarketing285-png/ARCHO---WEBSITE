import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

type RevealProps = {
  children: ReactNode
  /**
   * Retraso de la transición en ms. Escalonados observados en el original:
   * 0 / 80 / 160 / 240 en grids — 0 / 100 / 150 / 200 en secciones.
   */
  delay?: number
  className?: string
  /**
   * Etiqueta a renderizar. Se usa `li` dentro de listas, donde un `div` no es
   * hijo válido de `ol`/`ul`.
   */
  as?: 'div' | 'li'
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useReveal<HTMLDivElement & HTMLLIElement>()

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
