import { Link } from 'react-router-dom'

import ImagenSanity from '@/components/blog/ImagenSanity'
import { rutaPost, type PostResumen } from '@/data/blog'
import { formatoFecha } from '@/lib/fecha'

type PostCardProps = {
  post: PostResumen
  /** La primera tarjeta es candidata a LCP de /blog: su imagen no va en `lazy`. */
  priority?: boolean
}

/**
 * Una entrada del listado. Mismo lenguaje que la ficha de /projects: imagen
 * en caja fija con zoom lento al pasar el cursor, eyebrow con la raya naranja
 * y título en font-display. Toda la tarjeta es el enlace.
 */
export default function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group border-t border-white/10 pt-10 md:pt-12">
      <Link to={rutaPost(post.slug)} className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="relative aspect-[4/3] overflow-hidden bg-archo-ink md:col-span-5">
          <ImagenSanity
            imagen={post.imagen}
            proporcion={4 / 3}
            sizes="(min-width: 100rem) 640px, (min-width: 48rem) 40vw, calc(100vw - 3rem)"
            prioridad={priority}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
          />
        </div>

        <div className="flex flex-col md:col-span-7 md:pt-2">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.3em] text-archo-mist">
            <span className="h-px w-8 bg-archo-orange" />
            <time dateTime={post.publishedAt}>{formatoFecha(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.minutos} min de lectura</span>
          </p>

          <h2 className="font-display mt-6 text-balance text-3xl leading-[1.05] text-archo-cream transition-colors duration-500 group-hover:text-white md:text-5xl">
            {post.titulo}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-archo-mist">{post.extracto}</p>

          <span className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-archo-cream">
            Leer artículo
            <span
              aria-hidden="true"
              className="h-px w-8 bg-archo-orange transition-all duration-500 group-hover:w-14"
            />
          </span>
        </div>
      </Link>
    </article>
  )
}
