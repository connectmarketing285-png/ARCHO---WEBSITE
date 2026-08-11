import { Link } from 'react-router-dom'

import Reveal from '@/components/Reveal'
import UnsplashImage from '@/components/UnsplashImage'
import { HOME, REVEAL_DELAYS } from '@/data/home'

export default function AboutSection() {
  const { about } = HOME

  return (
    <section className="bg-archo-black px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <Reveal delay={REVEAL_DELAYS.section[0]} className="md:col-span-2">
          <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">{about.eyebrow}</p>
        </Reveal>

        <Reveal delay={REVEAL_DELAYS.section[1]} className="md:col-span-6">
          <h2 className="font-display text-balance text-4xl leading-[1.05] text-archo-cream md:text-6xl">
            {about.heading}
          </h2>

          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`max-w-xl text-base leading-relaxed text-archo-mist md:text-lg ${
                index === 0 ? 'mt-10' : 'mt-6'
              }`}
            >
              {paragraph}
            </p>
          ))}

          <Link
            to={about.linkTo}
            className="group mt-10 inline-flex min-h-11 items-center gap-3 text-sm uppercase tracking-[0.24em] text-archo-cream"
          >
            <span className="relative">
              {about.linkLabel}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-archo-orange transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            →
          </Link>
        </Reveal>

        <Reveal delay={REVEAL_DELAYS.section[2]} className="md:col-span-4 md:col-start-9">
          <div className="aspect-[4/5] overflow-hidden bg-archo-ink">
            <UnsplashImage
              id={about.image}
              alt={about.imageAlt}
              sizes="(min-width: 48rem) 33vw, calc(100vw - 3rem)"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
