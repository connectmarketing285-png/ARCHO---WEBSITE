import { useEffect, useRef, useState } from 'react'

import { rutaPost, type PostResumen } from '@/data/blog'
import { SITE_URL } from '@/data/seo'
import { trackShare, type RedCompartir } from '@/lib/analytics'

/**
 * COMPARTIR UN ARTÍCULO  ·  LinkedIn, WhatsApp y copiar enlace
 *
 * Enlaces directos a las páginas de compartir de cada red, sin SDKs: no pesan,
 * no ponen cookies de terceros y funcionan sin JavaScript.
 *
 * NO SE PARECE AL BOTÓN DE WHATSAPP DE LA CABECERA, a propósito. Aquel es
 * para escribirle a ARCHO: caja con borde y la marca de WhatsApp en naranja.
 * Estos son para mandarle el artículo a otra persona: texto en mayúsculas,
 * sin logotipos de las redes, bajo el rótulo "Compartir este artículo" y con
 * el mismo trazo que los enlaces "← Blog" / "Ver todos →" del artículo. El
 * aria-label dice "Compartir este artículo por WhatsApp", no "WhatsApp".
 *
 * La URL es la canónica (SITE_URL), no `window.location`: así no se comparte
 * una URL de preview ni una con parámetros de campaña, y es la misma en el
 * HTML prerenderizado que en el navegador.
 */

const CLASE =
  'inline-flex min-h-11 min-w-11 items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-archo-mist transition-colors hover:text-archo-orange focus-visible:text-archo-orange'

export default function Compartir({ post }: { post: PostResumen }) {
  const url = `${SITE_URL}${rutaPost(post.slug)}`
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${post.titulo} ${url}`)}`
  const medir = (red: RedCompartir) => () => trackShare(red, post.slug)

  return (
    <section aria-labelledby="compartir-titulo" className="mt-20 border-t border-white/10 pt-8">
      <h2 id="compartir-titulo" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-archo-cream">
        <span className="h-px w-8 bg-archo-orange" />
        Compartir este artículo
      </h2>

      <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-1">
        <li>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Compartir este artículo en LinkedIn (abre en una pestaña nueva)"
            onClick={medir('linkedin')}
            className={CLASE}
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Compartir este artículo por WhatsApp (abre en una pestaña nueva)"
            onClick={medir('whatsapp')}
            className={CLASE}
          >
            WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </li>
        <CopiarEnlace url={url} onCopiado={medir('copiar_enlace')} />
      </ul>
    </section>
  )
}

/**
 * "Copiar enlace". Sin JavaScript, o sin portapapeles (HTTP, navegadores
 * viejos), no se pinta: mejor ningún botón que uno que no hace nada. Por eso
 * arranca oculto en el HTML prerenderizado y aparece al hidratar; empezar
 * visible en el cliente daría un HTML distinto al del servidor.
 */
function CopiarEnlace({ url, onCopiado }: { url: string; onCopiado: () => void }) {
  const [disponible, setDisponible] = useState(false)
  const [estado, setEstado] = useState<'listo' | 'copiado' | 'error'>('listo')
  const temporizador = useRef<number | undefined>(undefined)

  useEffect(() => {
    setDisponible(window.isSecureContext && typeof navigator.clipboard?.writeText === 'function')
    return () => window.clearTimeout(temporizador.current)
  }, [])

  if (!disponible) return null

  const copiar = async () => {
    window.clearTimeout(temporizador.current)
    try {
      await navigator.clipboard.writeText(url)
      setEstado('copiado')
      onCopiado()
    } catch {
      setEstado('error')
    }
    temporizador.current = window.setTimeout(() => setEstado('listo'), 2500)
  }

  return (
    <li>
      <button type="button" onClick={copiar} aria-label="Copiar enlace de este artículo" className={CLASE}>
        {estado === 'copiado' ? (
          <>
            Copiado <span aria-hidden="true" className="text-archo-orange">✓</span>
          </>
        ) : estado === 'error' ? (
          'No se pudo copiar'
        ) : (
          'Copiar enlace'
        )}
      </button>
      {/* El cambio de texto del botón no siempre se anuncia; esto sí. */}
      <span role="status" className="sr-only">
        {estado === 'copiado' ? 'Enlace copiado al portapapeles' : estado === 'error' ? 'No se pudo copiar el enlace' : ''}
      </span>
    </li>
  )
}
