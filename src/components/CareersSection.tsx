import Reveal from '@/components/Reveal'
import SplitHeading from '@/components/SplitHeading'
import TallyEmbed from '@/components/TallyEmbed'
import { CAREERS } from '@/data/careers'
import { REVEAL_DELAYS } from '@/data/home'

/**
 * Va sobre `archo-ink` con la retícula de fondo, igual que las secciones
 * destacadas de la home: así se lee como un bloque aparte y no como una
 * continuación del formulario de contacto, que persigue otra cosa.
 */
export default function CareersSection() {
  return (
    <section
      id="unete"
      className="relative overflow-hidden border-y border-white/5 bg-archo-ink px-6 py-32 md:px-10 md:py-44"
    >
      <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <Reveal delay={REVEAL_DELAYS.section[0]} className="md:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
            {CAREERS.eyebrow}
          </p>
          <SplitHeading
            lead={CAREERS.heading.lead}
            accent={CAREERS.heading.accent}
            className="mt-8 text-balance text-4xl leading-[1.05] text-archo-cream md:text-5xl"
          />
          <p className="mt-10 max-w-md text-base leading-relaxed text-archo-mist md:text-lg">
            {CAREERS.lede}
          </p>

          {/* Alternativa por correo, siempre visible: si el visitante tiene un
              bloqueador que corta el iframe de Tally, sigue habiendo una vía. */}
          <p className="mt-10 text-sm text-archo-mist">
            {CAREERS.fallback.note}{' '}
            <a
              href={CAREERS.fallback.href}
              className="touch-target text-archo-cream underline decoration-archo-orange underline-offset-4 transition-colors hover:text-archo-orange"
            >
              {CAREERS.fallback.label}
            </a>
          </p>
        </Reveal>

        <Reveal delay={REVEAL_DELAYS.section[1]} className="md:col-span-6 md:col-start-7">
          <div className="border-t border-white/10 pt-10">
            <TallyEmbed src={CAREERS.embed.src} title={CAREERS.embed.title} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
