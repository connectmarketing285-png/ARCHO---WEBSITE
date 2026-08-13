import { useEffect, useRef } from 'react'

import { useNearViewport } from '@/hooks/useNearViewport'

const SCRIPT_SRC = 'https://tally.so/widgets/embed.js'

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void }
  }
}

type TallyEmbedProps = {
  src: string
  /** Título del iframe. El fragmento que da Tally trae `title="null"`. */
  title: string
  /** Alto inicial, antes de que el script ajuste el real. */
  minHeight?: number
}

/**
 * Formulario de Tally incrustado.
 *
 * Se monta solo al acercarse a la sección: el script de Tally y el iframe son
 * peso de terceros, y la sección vive al final de /contact, donde la mayoría
 * en móvil no llega. Mismo criterio que el mapa.
 *
 * El script de Tally es quien ajusta el alto del iframe al contenido; sin él
 * el formulario quedaría recortado dentro de una caja fija.
 */
export default function TallyEmbed({ src, title, minHeight = 460 }: TallyEmbedProps) {
  const [holderRef, near] = useNearViewport<HTMLDivElement>()
  const frameRef = useRef<HTMLIFrameElement>(null)

  // El script de Tally reescribe el `title` del iframe a "Form - Tally", en
  // inglés y sin decir de qué formulario se trata. Se vigila el atributo y se
  // restituye: es lo único que anuncia un lector de pantalla al llegar aquí.
  useEffect(() => {
    const frame = frameRef.current
    if (!near || !frame) return

    const observer = new MutationObserver(() => {
      if (frame.getAttribute('title') !== title) frame.setAttribute('title', title)
    })
    observer.observe(frame, { attributes: true, attributeFilter: ['title'] })
    return () => observer.disconnect()
  }, [near, title])

  useEffect(() => {
    if (!near) return

    // Si el script no llega (bloqueador, red caída), se asigna el src a mano:
    // se pierde el alto dinámico, pero el formulario se ve y funciona.
    const activar = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds()
        return
      }
      const frame = frameRef.current
      if (frame && !frame.src && frame.dataset.tallySrc) {
        frame.src = frame.dataset.tallySrc
      }
    }

    if (window.Tally) {
      window.Tally.loadEmbeds()
      return
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    const nuevo = !script
    if (!script) {
      script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', activar)
    script.addEventListener('error', activar)

    return () => {
      script?.removeEventListener('load', activar)
      script?.removeEventListener('error', activar)
      // El script se deja puesto aunque se desmonte: es de terceros, cachea y
      // volver a inyectarlo en cada visita a /contact no aporta nada.
      void nuevo
    }
  }, [near])

  return (
    <div ref={holderRef} style={{ minHeight }}>
      {near && (
        <iframe
          ref={frameRef}
          data-tally-src={src}
          title={title}
          loading="lazy"
          width="100%"
          height={minHeight}
          frameBorder={0}
          className="w-full border-0"
        />
      )}
    </div>
  )
}
