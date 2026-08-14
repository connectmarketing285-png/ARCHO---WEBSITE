import Reveal from '@/components/Reveal'
import SplitHeading from '@/components/SplitHeading'
import UnsplashImage from '@/components/UnsplashImage'
import { REVEAL_DELAYS } from '@/data/home'
import { INMUEBLES, INMUEBLES_PAGE } from '@/data/inmuebles'

/** Se cuentan desde el catálogo para que la franja no pueda desmentirlo. */
function cifras(): string[] {
  return [
    String(INMUEBLES.length),
    String(new Set(INMUEBLES.map((i) => i.tipo)).size),
    String(new Set(INMUEBLES.map((i) => i.operacion)).size),
  ]
}

/**
 * Cabecera a sangre, con la misma gramática que el bloque de vídeo de la home:
 * imagen de fondo, degradado que la funde con el negro y la retícula encima.
 * La página anterior era el intro estándar sobre negro plano, que para una
 * sección comercial se quedaba corto.
 */
export default function InmueblesHero() {
  const { hero } = INMUEBLES_PAGE
  const valores = cifras()

  return (
    <>
      <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-archo-black">
        {/* Es el elemento LCP de la página: eager y con prioridad alta. */}
        <UnsplashImage
          id={hero.imagen}
          alt={hero.imagenAlt}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />

        {/* Dos degradados: el de arriba mantiene legible el header transparente
            sobre la foto, el de abajo funde la imagen con la sección siguiente. */}
        <div className="absolute inset-0 bg-gradient-to-b from-archo-black/85 via-archo-black/40 to-archo-black" />
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" />

        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
          <Reveal delay={REVEAL_DELAYS.section[0]}>
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-archo-mist">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-archo-orange shadow-[0_0_12px_var(--archo-orange)]" />
              {INMUEBLES_PAGE.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={REVEAL_DELAYS.section[1]}>
            <SplitHeading
              as="h1"
              lead={INMUEBLES_PAGE.title.lead}
              accent={INMUEBLES_PAGE.title.accent}
              className="mt-8 max-w-[12ch] text-balance text-6xl leading-[0.92] tracking-[-0.02em] text-archo-cream sm:text-7xl md:text-8xl xl:text-9xl"
            />
          </Reveal>

          <Reveal delay={REVEAL_DELAYS.section[2]}>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-archo-mist md:text-lg">
              {INMUEBLES_PAGE.lede}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Franja de cifras: separa la cabecera del cuerpo y da una lectura
          rápida del tamaño de la cartera. */}
      <section className="border-y border-white/5 bg-archo-black px-6 md:px-10">
        <dl className="mx-auto grid max-w-[1600px] grid-cols-3 gap-6 py-10 md:py-14">
          {hero.cifras.map((cifra, index) => (
            <Reveal
              key={cifra.label}
              delay={index * 80}
              className="flex flex-col-reverse gap-2 border-l border-white/10 pl-4 md:pl-8"
            >
              <dt className="text-[10px] uppercase leading-relaxed tracking-[0.24em] text-archo-mist md:text-[11px]">
                {cifra.label}
              </dt>
              <dd className="font-display text-4xl text-archo-cream md:text-6xl">
                {valores[index]}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>
    </>
  )
}
