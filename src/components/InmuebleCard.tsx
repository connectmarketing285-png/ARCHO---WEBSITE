import UnsplashImage from '@/components/UnsplashImage'
import type { Inmueble } from '@/data/inmuebles'
import { useNearViewport } from '@/hooks/useNearViewport'

/** Solo se listan los datos que el inmueble trae: un terreno no tiene baños. */
function fichaTecnica(inmueble: Inmueble): string[] {
  const datos = [inmueble.superficie]
  if (inmueble.recamaras) datos.push(`${inmueble.recamaras} rec.`)
  if (inmueble.banos) datos.push(`${inmueble.banos} baños`)
  if (inmueble.estacionamientos) datos.push(`${inmueble.estacionamientos} est.`)
  return datos
}

type InmuebleCardProps = {
  inmueble: Inmueble
  /** La primera ficha es la imagen LCP del catálogo. */
  priority?: boolean
}

export default function InmuebleCard({ inmueble, priority = false }: InmuebleCardProps) {
  // Mismo criterio que las fichas de /projects: con 4G lento Chrome amplía
  // tanto el margen de `loading="lazy"` que se traería todo el catálogo de
  // golpe y las de abajo le robarían ancho de banda a la primera.
  const [frameRef, near] = useNearViewport<HTMLDivElement>()

  return (
    <article className="group flex h-full flex-col">
      <div
        ref={frameRef}
        className="relative aspect-[4/3] overflow-hidden bg-archo-black"
      >
        {(priority || near) && (
          <UnsplashImage
            id={inmueble.imagen}
            alt={inmueble.alt}
            sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, calc(100vw - 3rem)"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-archo-black/70 via-transparent to-transparent" />

        <p className="absolute left-4 top-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-archo-cream">
          <span className="h-px w-6 bg-archo-orange" />
          {inmueble.operacion}
        </p>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">{inmueble.tipo}</p>

        <h3 className="font-display mt-3 text-2xl text-archo-cream md:text-3xl">
          {inmueble.nombre}
        </h3>
        <p className="mt-1 text-sm text-archo-mist">{inmueble.ubicacion}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-archo-mist">
          {fichaTecnica(inmueble).map((dato) => (
            <li key={dato}>{dato}</li>
          ))}
        </ul>

        {/* mt-auto: los precios quedan alineados aunque las fichas midan distinto. */}
        <p className="font-display mt-auto pt-6 text-xl text-archo-cream">{inmueble.precio}</p>
        <span className="mt-4 block h-px w-8 bg-archo-orange transition-all duration-700 group-hover:w-20" />
      </div>
    </article>
  )
}
