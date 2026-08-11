type SplitHeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  lead: string
  /** Segunda mitad del título. Se renderiza en `italic font-light text-archo-mist`. */
  accent?: string
  className?: string
}

/**
 * Título mixto: texto normal + segunda parte en cursiva ligera y color mist.
 * Es el patrón tipográfico que el sitio repite en cada H1 y en casi cada H2,
 * así que vive en un solo lugar en vez de repetir el <span> en cada página.
 */
export default function SplitHeading({
  as: Tag = 'h2',
  lead,
  accent,
  className = '',
}: SplitHeadingProps) {
  return (
    <Tag className={`font-display ${className}`.trim()}>
      {lead}
      {accent && (
        <>
          {' '}
          <span className="font-light italic text-archo-mist">{accent}</span>
        </>
      )}
    </Tag>
  )
}
