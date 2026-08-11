import DisciplineCard from '@/components/DisciplineCard'
import Reveal from '@/components/Reveal'
import SplitHeading from '@/components/SplitHeading'
import { REVEAL_DELAYS } from '@/data/home'
import { SERVICES, SERVICES_PAGE } from '@/data/services'

/** El grid es de 3 columnas en lg: el escalonado se reinicia cada 3. */
const gridDelay = (index: number) => REVEAL_DELAYS.grid[index % 3]

export default function Services() {
  const { index, outro, closing } = SERVICES_PAGE

  return (
    <div className="bg-archo-black pt-32 md:pt-44">
      {/* Cabecera propia: a diferencia del resto de páginas interiores, aquí el
          eyebrow va en columna aparte del H1. */}
      <section className="px-6 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
          <Reveal delay={REVEAL_DELAYS.section[0]} className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
              {SERVICES_PAGE.eyebrow}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-archo-orange">
              {SERVICES_PAGE.eyebrowAccent}
            </p>
          </Reveal>

          <Reveal delay={REVEAL_DELAYS.section[1]} className="md:col-span-9">
            <SplitHeading
              as="h1"
              lead={SERVICES_PAGE.title.lead}
              accent={SERVICES_PAGE.title.accent}
              className="max-w-[18ch] text-balance text-5xl leading-[0.95] text-archo-cream md:text-7xl lg:text-8xl"
            />
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-archo-mist md:text-lg">
              {SERVICES_PAGE.lede}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mt-32 px-6 md:mt-44 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">{index.label}</p>
            <p className="hidden text-[11px] uppercase tracking-[0.3em] text-archo-mist md:block">
              {index.hint}
            </p>
          </div>

          {/* gap-px sobre un fondo claro: las hairlines son el fondo asomando. */}
          <div className="grid auto-rows-[1fr] grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, position) => (
              <Reveal key={service.number} delay={gridDelay(position)}>
                <DisciplineCard service={service} />
              </Reveal>
            ))}

            {/* Cierra la retícula de 3 columnas; en sm son 2 y no hace falta. */}
            <div className="hidden bg-archo-black lg:block">
              <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
                <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-30" />

                <div className="relative flex items-start justify-between">
                  <span className="font-display text-sm tracking-[0.2em] text-archo-mist">
                    {outro.symbol}
                  </span>
                  <span className="h-px w-10 translate-y-2 bg-archo-orange" />
                </div>

                <div className="relative mt-16">
                  <p className="font-display max-w-[18ch] text-2xl leading-[1.1] text-archo-cream md:text-3xl">
                    {outro.heading}
                  </p>
                  <p className="mt-6 text-sm text-archo-mist">{outro.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-40 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
          <Reveal delay={REVEAL_DELAYS.section[0]} className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
              {closing.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={REVEAL_DELAYS.section[1]} className="md:col-span-9">
            <h2 className="font-display max-w-[22ch] text-balance text-4xl leading-tight text-archo-cream md:text-6xl">
              {closing.heading}
            </h2>
            <span className="mt-10 block h-px w-24 bg-archo-orange" />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
