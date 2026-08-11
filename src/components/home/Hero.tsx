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
          {/* 27vw en lugar del 28vw original: Poppins pinta ~6,8% más ancha que
              Inter Tight y a 28vw solo dejaba 3,5px de aire por lado a 320px.
              De md en adelante sobra sitio y los tamaños no se tocan.

              El tracking va AQUÍ y no en el <h1>: `em` en letter-spacing se
              resuelve contra el font-size del elemento donde se declara. En el
              h1 (16px) el tracking-[-0.04em] del original vale -0,64px, no los
              -3,9px que aparenta a la escala del wordmark. Declarado en el span
              (97,5px a 375) el valor sí es el que se lee. */}
          <span className="wordmark block text-[27vw] tracking-[-0.02em] md:text-[22vw] xl:text-[20rem]">
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
