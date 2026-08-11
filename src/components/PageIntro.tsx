import Reveal from '@/components/Reveal'
import SplitHeading from '@/components/SplitHeading'
import { REVEAL_DELAYS } from '@/data/home'

type PageIntroProps = {
  eyebrow: string
  title: { lead: string; accent?: string }
  lede?: string
  /** Cada página ajusta la medida y la escala del H1; el resto es idéntico. */
  titleClassName?: string
  ledeClassName?: string
}

const DEFAULT_TITLE_CLASS =
  'mt-8 max-w-[14ch] text-5xl leading-[0.95] text-archo-cream md:text-8xl'
const DEFAULT_LEDE_CLASS =
  'mt-10 max-w-xl text-base leading-relaxed text-archo-mist md:text-lg'

/**
 * Cabecera de página interior: eyebrow, H1 mixto y bajada opcional, con el
 * escalonado 0 / 100 / 200 que usan todas las secciones del sitio.
 */
export default function PageIntro({
  eyebrow,
  title,
  lede,
  titleClassName = DEFAULT_TITLE_CLASS,
  ledeClassName = DEFAULT_LEDE_CLASS,
}: PageIntroProps) {
  return (
    <section className="px-6 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <Reveal delay={REVEAL_DELAYS.section[0]}>
          <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">{eyebrow}</p>
        </Reveal>

        <Reveal delay={REVEAL_DELAYS.section[1]}>
          <SplitHeading as="h1" lead={title.lead} accent={title.accent} className={titleClassName} />
        </Reveal>

        {lede && (
          <Reveal delay={REVEAL_DELAYS.section[2]}>
            <p className={ledeClassName}>{lede}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
