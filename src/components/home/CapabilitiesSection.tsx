import { Link } from 'react-router-dom'

import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import { CAPABILITIES, CAPABILITIES_OUTRO } from '@/data/capabilities'
import { HOME, REVEAL_DELAYS } from '@/data/home'

/** El grid es de 3 columnas en lg, así que el escalonado se reinicia cada 3. */
const gridDelay = (index: number) => REVEAL_DELAYS.grid[index % 3]

export default function CapabilitiesSection() {
  const { capabilities } = HOME

  return (
    <section className="relative border-y border-white/5 bg-archo-ink px-6 py-32 md:px-10 md:py-44">
      <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-[0.07]" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal delay={REVEAL_DELAYS.section[0]} className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
              {capabilities.eyebrow}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-archo-orange">
              {capabilities.eyebrowAccent}
            </p>
          </Reveal>

          <Reveal delay={REVEAL_DELAYS.section[1]} className="md:col-span-9">
            <h2 className="font-display max-w-[18ch] text-balance text-4xl leading-[1.05] text-archo-cream md:text-6xl lg:text-7xl">
              {capabilities.heading.lead}{' '}
              <span className="font-light italic text-archo-mist">
                {capabilities.heading.accent}
              </span>
            </h2>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-archo-mist md:text-lg">
              {capabilities.lede}
            </p>
          </Reveal>
        </div>

        {/* gap-px sobre un fondo claro: las hairlines del grid son el fondo asomando. */}
        <div className="mt-24 grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability, index) => (
            <Reveal key={capability.number} delay={gridDelay(index)}>
              <article className="group relative flex h-full min-h-[280px] flex-col justify-between bg-archo-ink p-8 transition-colors duration-700 hover:bg-archo-black md:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm tracking-[0.2em] text-archo-mist">
                    {capability.number}
                  </span>
                  <div className="text-archo-mist transition-colors duration-500 group-hover:text-archo-orange">
                    <Icon name={capability.icon} />
                  </div>
                </div>
                <div className="mt-16">
                  <h3 className="font-display text-2xl leading-tight text-archo-cream md:text-3xl">
                    {capability.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-archo-mist">
                    {capability.description}
                  </p>
                  <span className="mt-6 block h-px w-8 bg-archo-orange transition-all duration-700 group-hover:w-20" />
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={gridDelay(CAPABILITIES.length)}>
            <article className="relative flex h-full min-h-[280px] flex-col justify-between bg-archo-ink p-8 md:p-10">
              <div className="flex items-start justify-between">
                <span className="font-display text-sm tracking-[0.2em] text-archo-mist">
                  {CAPABILITIES_OUTRO.symbol}
                </span>
                <span className="h-px w-10 translate-y-2 bg-archo-orange" />
              </div>
              <div className="mt-16">
                <p className="font-display max-w-[16ch] text-xl leading-[1.15] text-archo-cream md:text-2xl">
                  {CAPABILITIES_OUTRO.text}
                </p>
                <Link
                  to={CAPABILITIES_OUTRO.linkTo}
                  className="touch-target mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-archo-mist hover:text-archo-cream"
                >
                  {CAPABILITIES_OUTRO.linkLabel}
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
