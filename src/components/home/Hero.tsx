import Reveal from '@/components/Reveal'
import { HOME } from '@/data/home'
import { SITE } from '@/data/site'

export default function Hero() {
  return (
    <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-archo-black px-6 pt-32 md:pt-40">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" />

      <img
        src={SITE.logo}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[78vw] max-w-[820px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.04]"
      />

      <p className="pointer-events-none absolute left-6 top-28 text-[11px] uppercase tracking-[0.3em] text-archo-mist md:left-10 md:top-32">
        <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-archo-orange shadow-[0_0_12px_var(--archo-orange)]" />
        {HOME.hero.eyebrow}
      </p>

      <Reveal className="relative w-full text-center">
        <span className="mx-auto mb-10 inline-flex items-center gap-3 opacity-90">
          <img
            src={SITE.logo}
            alt={SITE.name}
            width={80}
            height={80}
            className="h-16 w-16 select-none object-contain md:h-20 md:w-20"
            draggable={false}
          />
        </span>

        <h1 className="font-display select-none leading-[0.82] tracking-[-0.04em] text-archo-cream">
          <span className="block text-[28vw] md:text-[22vw] xl:text-[20rem]">
            {HOME.hero.title}
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-xl text-balance text-base leading-relaxed text-archo-mist md:text-lg">
          {HOME.hero.lede}
        </p>
      </Reveal>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-archo-mist md:block">
        {HOME.hero.scrollHint}
      </div>
    </section>
  )
}
