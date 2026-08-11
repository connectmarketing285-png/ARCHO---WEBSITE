import { Link } from 'react-router-dom'

import CountUp from '@/components/CountUp'
import PageIntro from '@/components/PageIntro'
import Reveal from '@/components/Reveal'
import SplitHeading from '@/components/SplitHeading'
import UnsplashImage from '@/components/UnsplashImage'
import { ABOUT } from '@/data/about'

export default function About() {
  const { manifesto, method, vision, values, stats, cta } = ABOUT

  return (
    <div className="bg-archo-black pt-32 md:pt-44">
      <PageIntro
        eyebrow={ABOUT.intro.eyebrow}
        title={ABOUT.intro.title}
        lede={ABOUT.intro.lede}
        titleClassName="mt-8 max-w-[18ch] text-5xl leading-[0.95] text-archo-cream md:text-[8.5vw] xl:text-9xl"
        ledeClassName="mt-12 max-w-2xl text-base leading-relaxed text-archo-mist md:text-lg"
      />

      {/* Manifiesto */}
      <section className="px-6 py-40 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
              {manifesto.eyebrow}
            </p>
          </Reveal>

          <div className="space-y-10 md:col-span-7">
            <Reveal>
              <p className="font-display text-3xl leading-snug text-archo-cream md:text-4xl">
                {manifesto.statement}
              </p>
            </Reveal>

            {manifesto.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={120 + index * 80}>
                <p className="text-base leading-relaxed text-archo-mist md:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260} className="md:col-span-3">
            <div className="aspect-[3/4] overflow-hidden bg-archo-ink">
              <UnsplashImage
                id={manifesto.image}
                alt={manifesto.imageAlt}
                sizes="(min-width: 48rem) 25vw, calc(100vw - 3rem)"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 01 · Método */}
      <section className="relative overflow-hidden border-y border-white/5 bg-archo-ink px-6 py-32 md:px-10 md:py-44">
        <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-[1600px]">
          <div className="grid gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
                {method.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={100} className="md:col-span-7">
              <SplitHeading
                lead={method.heading.lead}
                accent={method.heading.accent}
                className="text-balance text-4xl leading-[1.05] text-archo-cream md:text-6xl"
              />
              <p className="mt-10 max-w-xl text-base leading-relaxed text-archo-mist md:text-lg">
                {method.lede}
              </p>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-12">
            <Reveal delay={120} className="md:col-span-7">
              <div className="aspect-[16/10] overflow-hidden bg-archo-black">
                <UnsplashImage
                  id={method.image}
                  alt={method.imageAlt}
                  sizes="(min-width: 48rem) 58vw, calc(100vw - 3rem)"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <ol className="space-y-8 md:col-span-5">
              {method.steps.map((step, index) => (
                <Reveal
                  key={step.number}
                  as="li"
                  delay={160 + index * 70}
                  className="grid grid-cols-12 gap-4 border-t border-white/10 pt-5"
                >
                  <p className="font-display col-span-2 text-sm text-archo-mist">{step.number}</p>
                  <div className="col-span-10">
                    <h3 className="font-display text-xl text-archo-cream md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-archo-mist">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 02 · Visión */}
      <section className="relative overflow-hidden px-6 py-32 md:px-10 md:py-44">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-archo-ink">
              <UnsplashImage
                id={vision.image}
                alt={vision.imageAlt}
                sizes="(min-width: 48rem) 42vw, calc(100vw - 3rem)"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="self-center md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
                {vision.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <SplitHeading
                lead={vision.heading.lead}
                accent={vision.heading.accent}
                className="mt-8 text-balance text-4xl leading-[1.05] text-archo-cream md:text-6xl"
              />
            </Reveal>

            {vision.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={180 + index * 60}>
                <p
                  className={`max-w-xl text-base leading-relaxed text-archo-mist md:text-lg ${
                    index === 0 ? 'mt-10' : 'mt-6'
                  }`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · Valores */}
      <section className="relative overflow-hidden bg-archo-petrol-deep px-6 py-32 md:px-10 md:py-44">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-[1600px]">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
                {values.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={100} className="md:col-span-7">
              <SplitHeading
                lead={values.heading.lead}
                accent={values.heading.accent}
                className="text-balance text-4xl leading-[1.05] text-archo-cream md:text-6xl"
              />
            </Reveal>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-4">
            {values.items.map((value, index) => (
              <Reveal key={value.number} delay={index * 100} className="border-t border-white/15 pt-6">
                <p className="font-display text-sm text-archo-mist">{value.number}</p>
                <h3 className="font-display mt-8 text-3xl text-archo-cream">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-archo-mist">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* El estudio en cifras */}
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
              {stats.eyebrow}
            </p>
          </Reveal>

          <dl className="mt-16 grid gap-y-16 md:grid-cols-4">
            {stats.items.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 100}
                // flex-col-reverse: en el <dl> el <dt> debe preceder al <dd>,
                // pero la cifra se lee arriba y la etiqueta debajo.
                className="flex flex-col-reverse gap-6 md:border-l md:border-white/10 md:pl-8"
              >
                <dt className="text-sm uppercase tracking-[0.24em] text-archo-mist">
                  {stat.label}
                </dt>
                <dd className="font-display text-6xl text-archo-cream md:text-7xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-archo-cream px-6 py-32 text-archo-black md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-balance text-5xl leading-[1.02] md:text-7xl">
              {cta.heading}
            </h2>
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
