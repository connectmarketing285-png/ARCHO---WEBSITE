import { Link } from 'react-router-dom'

import Reveal from '@/components/Reveal'
import UnsplashImage from '@/components/UnsplashImage'
import { HOME, REVEAL_DELAYS } from '@/data/home'
import { SERVICES } from '@/data/services'

/** 4 columnas en lg: el escalonado 0/80/160/240 se reinicia cada 4. */
const gridDelay = (index: number) => REVEAL_DELAYS.grid[index % 4]

export default function ServicesSection() {
  const { services } = HOME

  return (
    <section className="bg-archo-black px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
              {services.eyebrow}
            </p>
            <h2 className="font-display mt-4 text-3xl text-archo-cream md:text-5xl">
              {services.heading}
            </h2>
          </div>
          <Link
            to={services.linkTo}
            className="hidden text-sm uppercase tracking-[0.24em] text-archo-mist hover:text-archo-cream md:inline"
          >
            {services.linkLabel}
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <Reveal key={service.number} delay={gridDelay(index)}>
              <Link to={services.linkTo} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-archo-ink">
                  <UnsplashImage
                    id={service.image}
                    alt={service.alt}
                    widths={[640, 828, 1200]}
                    sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, calc(100vw - 3rem)"
                    className="h-full w-full object-cover opacity-80 transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-archo-black/80 via-transparent to-archo-black/20" />
                  <span className="font-display absolute left-4 top-4 text-sm text-archo-mist">
                    {service.number}
                  </span>
                  <span className="absolute right-4 top-4 h-px w-8 bg-archo-orange" />
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-2xl text-archo-cream">{service.title}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-archo-mist">
                    {service.items.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 md:hidden">
          <Link
            to={services.linkTo}
            className="inline-flex min-h-11 items-center text-sm uppercase tracking-[0.24em] text-archo-mist"
          >
            {services.linkLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
