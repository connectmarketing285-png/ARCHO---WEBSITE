import { useCountUp } from '@/hooks/useCountUp'

type CountUpProps = {
  value: number
  /** Se pinta fijo tras la cifra: el "+" de "120+" no debe aparecer al vuelo. */
  suffix?: string
  className?: string
}

export default function CountUp({ value, suffix = '', className }: CountUpProps) {
  const [ref, current] = useCountUp<HTMLSpanElement>(value)

  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  )
}
