import { Link } from 'react-router-dom'

import InmuebleCard from '@/components/InmuebleCard'
import InmueblesHero from '@/components/InmueblesHero'
import Reveal from '@/components/Reveal'
import SplitHeading from '@/components/SplitHeading'
import { REVEAL_DELAYS } from '@/data/home'
import { DEMO, INMUEBLES, INMUEBLES_PAGE } from '@/data/inmuebles'

/** El catálogo es de 3 columnas en lg: el escalonado se reinicia cada 3. */
const gridDelay = (index: number) => REVEAL_DELAYS.grid[index % 3]

export default function Inmuebles() {
  const { servicios, catalogo, cta } = INMUEBLES_PAGE

  // Sin pt-*: la cabecera va a sangre y pasa por debajo del header fijo.
  return (
    <div className="bg-archo-black">
      <InmueblesHero />

      {/* Servicios */}
      <section className="relative overflow-hidden border-b border-white/5 bg-archo-ink px-6 py-32 md:px-10 md:py-44">
        <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-[1600px]">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal delay={REVEAL_DELAYS.section[0]} className="md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
                {servicios.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={REVEAL_DELAYS.section[1]} className="md:col-span-9">
              <SplitHeading
                lead={servicios.heading.lead}
                accent={servicios.heading.accent}
                className="max-w-[18ch] text-balance text-4xl leading-[1.05] text-archo-cream md:text-6xl"
              />
            </Reveal>
          </div>

          {/* gap-px sobre fondo claro: las hairlines son el fondo asomando. */}
          <div className="mt-20 grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {servicios.items.map((servicio, index) => (
              <Reveal key={servicio.number} delay={gridDelay(index)}>
                <article className="group flex h-full min-h-[260px] flex-col justify-between bg-archo-ink p-8 transition-colors duration-700 hover:bg-archo-black md:p-10">
                  <span className="font-display text-sm tracking-[0.2em] text-archo-mist">
                    {servicio.number}
                  </span>
                  <div className="mt-16">
                    <h3 className="font-display text-2xl leading-tight text-archo-cream">
                      {servicio.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-archo-mist">
                      {servicio.description}
                    </p>
                    <span className="mt-6 block h-px w-8 bg-archo-orange transition-all duration-700 group-hover:w-20" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section className="px-6 py-32 md:px-10 md:py-44">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 border-b border-white/10 pb-6">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
                {catalogo.eyebrow}
              </p>
              <SplitHeading
                lead={catalogo.heading.lead}
                accent={catalogo.heading.accent}
                className="mt-4 text-3xl text-archo-cream md:text-5xl"
              />
            </Reveal>
          </div>

          {/* Aviso de maqueta. Se retira poniendo DEMO en false, junto con los
              datos ficticios de src/data/inmuebles.ts. */}
          {DEMO && (
            <p
              role="note"
              className="mb-12 border-l-2 border-archo-orange bg-archo-ink/60 px-5 py-4 text-sm leading-relaxed text-archo-mist"
            >
              {catalogo.demoNotice}
            </p>
          )}

          {INMUEBLES.length === 0 ? (
            <p className="max-w-md text-base text-archo-mist">{catalogo.vacio}</p>
          ) : (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {INMUEBLES.map((inmueble, index) => (
                <Reveal key={inmueble.slug} delay={gridDelay(index)}>
                  <InmuebleCard inmueble={inmueble} priority={index === 0} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-archo-cream px-6 py-32 text-archo-black md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-balance text-4xl leading-[1.02] md:text-6xl">
              {cta.heading}
            </h2>
            <p className="mt-8 max-w-md text-base text-archo-black/70 md:text-lg">{cta.lede}</p>
          </Reveal>

          <Reveal delay={150} className="self-end md:col-span-4 md:col-start-9">
            <Link
              to={cta.linkTo}
              className="touch-target inline-flex items-center gap-4 border-b border-archo-black pb-2 text-sm uppercase tracking-[0.24em]"
            >
              {cta.linkLabel}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
