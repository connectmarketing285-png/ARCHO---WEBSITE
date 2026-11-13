import { Link, useParams } from 'react-router-dom'

import ImagenSanity from '@/components/blog/ImagenSanity'
import PortableTexto from '@/components/blog/PortableTexto'
import ContactSection from '@/components/home/ContactSection'
import Reveal from '@/components/Reveal'
import { firma, postPorSlug } from '@/data/blog'
import { useCuerpo } from '@/lib/articulo'
import { formatoFecha } from '@/lib/fecha'
import NotFound from '@/pages/NotFound'

const ENLACE_CLASE =
  'inline-flex min-h-11 items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-archo-mist transition-colors hover:text-archo-orange'

/**
 * Un artículo del blog.
 *
 * La cabecera (título, fecha, extracto, imagen) sale del listado, que está en
 * el bundle; el cuerpo, de `useCuerpo` (ver lib/articulo.ts). En el HTML
 * prerenderizado está todo, cuerpo incluido.
 *
 * Termina en la misma sección de contacto que la home: quien llega a un
 * artículo desde Google tiene a mano el siguiente paso.
 */
export default function BlogPost() {
  const { slug = '' } = useParams()
  const post = postPorSlug(slug)
  const cuerpo = useCuerpo(slug)

  /* Un slug que no está en el listado: un enlace roto dentro del sitio. Al
     entrar por URL directa lo resuelve Vercel con 404.html (no hay archivo). */
  if (!post) return <NotFound />

  const fecha = formatoFecha(post.publishedAt)

  return (
    <div className="bg-archo-black pt-32 md:pt-44">
      <article>
        <header className="px-6 md:px-10">
          <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Reveal>
                <Link to="/blog" className={ENLACE_CLASE}>
                  <span aria-hidden="true">←</span> Blog
                </Link>
              </Reveal>

              <Reveal delay={100}>
                <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.3em] text-archo-mist">
                  <span className="h-px w-8 bg-archo-orange" />
                  <time dateTime={post.publishedAt}>{fecha}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.minutos} min de lectura</span>
                </p>
              </Reveal>

              <Reveal delay={150}>
                <h1 className="font-display mt-8 text-balance text-4xl leading-[1.02] text-archo-cream md:text-6xl lg:text-7xl">
                  {post.titulo}
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-10 max-w-xl text-base leading-relaxed text-archo-mist md:text-lg">
                  {post.extracto}
                </p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-archo-mist/70">
                  Por {firma(post)}
                </p>
              </Reveal>
            </div>

            <Reveal delay={150} className="md:col-span-5 md:col-start-8">
              <ImagenSanity
                imagen={post.imagen}
                prioridad
                limitarAlOriginal
                sizes="(min-width: 100rem) 600px, (min-width: 48rem) 38vw, calc(100vw - 3rem)"
                className="h-auto w-full bg-archo-ink md:ml-auto"
              />
            </Reveal>
          </div>
        </header>

        <div className="px-6 pb-32 pt-20 md:px-10 md:pt-28">
          <div className="mx-auto max-w-[1600px] md:grid md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
              {cuerpo.estado === 'listo' && (
                <div className="prosa">
                  <PortableTexto bloques={cuerpo.cuerpo} />
                </div>
              )}

              {cuerpo.estado === 'cargando' && (
                <p aria-busy="true" className="text-base text-archo-mist">
                  Cargando el artículo…
                </p>
              )}

              {cuerpo.estado === 'error' && (
                <p role="alert" className="text-base text-archo-mist">
                  No se pudo cargar el artículo.{' '}
                  <a href={`/blog/${post.slug}`} className="text-archo-cream underline decoration-archo-orange underline-offset-4">
                    Vuelve a intentarlo
                  </a>
                  .
                </p>
              )}

              <footer className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
                  {firma(post)} · <time dateTime={post.publishedAt}>{fecha}</time>
                </p>
                <Link to="/blog" className={ENLACE_CLASE}>
                  Ver todos los artículos <span aria-hidden="true">→</span>
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </article>

      <ContactSection />
    </div>
  )
}
