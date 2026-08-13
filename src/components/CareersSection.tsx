import CareersForm from '@/components/CareersForm'
import Reveal from '@/components/Reveal'
import SplitHeading from '@/components/SplitHeading'
import { CAREERS } from '@/data/careers'
import { REVEAL_DELAYS } from '@/data/home'
import { careersUploadEnabled } from '@/lib/careers-form'

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
        </Reveal>

        <Reveal delay={REVEAL_DELAYS.section[1]} className="md:col-span-6 md:col-start-7">
          {careersUploadEnabled ? (
            <CareersForm />
          ) : (
            /* Sin servicio de subida contratado, el formulario no entregaría el
               CV a ningún sitio. Se ofrece la vía por correo, que sí funciona. */
            <div className="border-t border-white/10 pt-10">
              <a
                href={CAREERS.fallback.href}
                className="group inline-flex min-h-11 items-center gap-4 border-b border-archo-cream pb-2 text-sm uppercase tracking-[0.24em] text-archo-cream transition-colors hover:border-archo-orange hover:text-archo-orange"
              >
                {CAREERS.fallback.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-archo-mist">
                {CAREERS.fallback.note}
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
