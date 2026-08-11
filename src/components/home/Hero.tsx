import Reveal from '@/components/Reveal'
import { HOME } from '@/data/home'
import { SITE } from '@/data/site'

export default function Hero() {
  return (
    <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-archo-black px-6 pt-32 md:pt-40">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" />

      {/* El lockup anterior era horizontal y a 78vw de ancho pintaba una banda
          de ~66vw x 19vw. El isotipo es vertical, así que a ese mismo ancho
          llenaría la pantalla: 32vw le da una superficie equivalente. */}
      <img
        src={SITE.logo}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[32vw] max-w-[335px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.04]"
      />

      <p className="pointer-events-none absolute left-6 top-28 text-[11px] uppercase tracking-[0.3em] text-archo-mist md:left-10 md:top-32">
        <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-archo-orange shadow-[0_0_12px_var(--archo-orange)]" />
        {HOME.hero.eyebrow}
      </p>

      <Reveal className="relative w-full text-center">
        <span className="mx-auto mb-10 inline-flex items-center gap-3 opacity-90">
          {/* width/height con el ratio real del isotipo, no un cuadrado: así el
              navegador reserva la caja correcta y no hay salto al cargar. */}
          <img
            src={SITE.logo}
            alt={SITE.name}
            width={901}
            height={1100}
            className="h-10 w-auto select-none object-contain md:h-12"
            draggable={false}
          />
        </span>

        <h1 className="font-display select-none leading-[0.82] tracking-[-0.04em] text-archo-cream">
          {/* 25,5vw. Poppins ya pinta ~6,8% más ancha que Inter Tight, y el
              peso 800 que pide el cliente suma otro 5%: sin bajar el tamaño
              volvería a quedarse sin aire a 320px. De md en adelante sobra
              sitio y los tamaños no se tocan.

              El tracking va AQUÍ y no en el <h1>: `em` en letter-spacing se
              resuelve contra el font-size del elemento donde se declara. En el
              h1 (16px) el tracking-[-0.04em] del original vale -0,64px, no los
              -3,9px que aparenta a la escala del wordmark. Declarado en el span
              (97,5px a 375) el valor sí es el que se lee. */}
          <span className="wordmark block text-[25.5vw] font-extrabold tracking-[-0.02em] md:text-[22vw] xl:text-[20rem]">
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
