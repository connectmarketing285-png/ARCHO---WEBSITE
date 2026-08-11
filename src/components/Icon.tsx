import { ICONS } from '@/data/icons'
import type { IconName } from '@/data/icons'

type IconProps = {
  name: IconName
  size?: number
  className?: string
}

/** stroke-width 1 y linecap square: el trazo técnico del original. */
export default function Icon({ name, size = 28, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {ICONS[name].map((shape, index) => {
        if (shape.type === 'circle') {
          return <circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} />
        }
        if (shape.type === 'rect') {
          return (
            <rect
              key={index}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              rx={'rx' in shape ? shape.rx : undefined}
            />
          )
        }
        return <path key={index} d={shape.d} />
      })}
    </svg>
  )
}
