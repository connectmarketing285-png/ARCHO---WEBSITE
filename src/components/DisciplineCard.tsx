import UnsplashImage from '@/components/UnsplashImage'
import type { Service } from '@/data/services'
import { SERVICES_PAGE } from '@/data/services'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function DisciplineCard({ service }: { service: Service }) {
  // La imagen de fondo solo existe en hover. En un dispositivo táctil nunca se
  // ve, y el navegador la descargaría igual al acercarse al viewport aunque
  // esté en opacity-0. Con prioridad móvil, ahí sencillamente no se monta.
  const canHover = useMediaQuery('(hover: hover)')

  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden bg-archo-black p-8 transition-colors duration-700 hover:bg-archo-ink md:p-10">
      {canHover && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-[0.18]"
        >
          <UnsplashImage
            id={service.image}
            alt=""
            widths={[828, 1200]}
            sizes="(min-width: 64rem) 33vw, 50vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-archo-black via-archo-black/40 to-transparent" />
        </div>
      )}

      <div className="relative flex items-start justify-between">
        <span className="font-display text-sm tracking-[0.2em] text-archo-mist">
          {service.number}
        </span>
        <span className="h-px w-10 translate-y-2 bg-archo-orange transition-all duration-700 group-hover:w-20" />
      </div>

      <div className="relative mt-16">
        <h2 className="font-display text-3xl leading-[1.05] text-archo-cream md:text-4xl lg:text-5xl">
          {service.title}
        </h2>

        <ul className="mt-8 grid gap-x-6 gap-y-2 text-sm text-archo-mist sm:grid-cols-2">
          {service.items.map((item, index) => (
            <li
              key={item}
              className="flex items-start gap-2 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <span className="mt-[0.55rem] inline-block h-px w-3 shrink-0 bg-archo-mist/60 transition-colors group-hover:bg-archo-orange" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-8 text-[10px] uppercase tracking-[0.3em] text-archo-mist opacity-0 transition-opacity duration-500 group-hover:opacity-80"
      >
        {SERVICES_PAGE.cardTag}
      </span>
    </article>
  )
}
