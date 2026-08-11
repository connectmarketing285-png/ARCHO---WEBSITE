import UnsplashImage from '@/components/UnsplashImage'
import type { Project } from '@/data/projects'
import { useNearViewport } from '@/hooks/useNearViewport'

/**
 * Ficha de obra. No es un enlace: el original apuntaba a /projects/{slug} y esas
 * rutas no existen aquí (no hay contenido capturado para las fichas de detalle).
 * Envolver la tarjeta en un <a> a una ruta muerta daría una pantalla en blanco,
 * así que se deja como <article> hasta que el cliente entregue ese contenido.
 */
type ProjectCardProps = {
  project: Project
  /**
   * La primera ficha es el elemento LCP de /projects. En `lazy` el navegador
   * no la descubre hasta después del layout y el LCP se va a 3,4 s.
   */
  priority?: boolean
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  // `loading="lazy"` no basta: con 4G lento Chrome amplía tanto su margen que
  // se traía las 6 fichas de golpe, y las 5 de abajo le robaban ancho de banda
  // a la imagen LCP. Montarlas al acercarse deja el primer pintado sin rivales.
  const [frameRef, near] = useNearViewport<HTMLDivElement>()

  return (
    <article className="group">
      <div
        ref={frameRef}
        className="relative aspect-[4/5] overflow-hidden bg-archo-ink md:aspect-[16/11]"
      >
        {(priority || near) && (
          <UnsplashImage
            id={project.image}
            alt={project.name}
            sizes="(min-width: 48rem) 58vw, calc(100vw - 3rem)"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
          />
        )}
        <p className="absolute left-6 top-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-archo-cream">
          <span className="h-px w-8 bg-archo-orange" />
          {project.category}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-12 items-end gap-6">
        <div className="col-span-8">
          <h2 className="font-display text-2xl text-archo-cream md:text-3xl">{project.name}</h2>
          <p className="mt-1 text-sm text-archo-mist">{project.location}</p>
        </div>
        <div className="col-span-4 text-right">
          <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">{project.year}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-archo-mist/60">
            {project.area}
          </p>
        </div>
      </div>
    </article>
  )
}
