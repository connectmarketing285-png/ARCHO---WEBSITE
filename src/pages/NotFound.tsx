import { Link } from 'react-router-dom'

import PageIntro from '@/components/PageIntro'
import { SITE } from '@/data/site'

/**
 * La página de error. Antes no existía: una URL desconocida pintaba cabecera y
 * pie con nada en medio, y el servidor respondía 200 (un "soft 404" que el
 * buscador puede indexar). Ahora `dist/404.html` sale de aquí y Vercel la
 * sirve con estado 404 de verdad.
 */
export default function NotFound() {
  return (
    <div className="bg-archo-black pb-32 pt-32 md:pb-44 md:pt-44">
      <PageIntro
        eyebrow="Error 404"
        title={{ lead: 'Esta página', accent: 'no existe.' }}
        lede="Puede que el enlace esté mal escrito o que la página se haya movido."
      />

      <div className="mx-auto mt-12 flex max-w-[1600px] flex-wrap gap-x-10 gap-y-4 px-6 text-[11px] uppercase tracking-[0.24em] md:px-10">
        <Link to="/" className="inline-flex min-h-11 items-center text-archo-cream transition-colors hover:text-archo-orange">
          Volver al inicio
        </Link>
        <Link to="/contact" className="inline-flex min-h-11 items-center text-archo-mist transition-colors hover:text-archo-orange">
          Contacto
        </Link>
        <a href={SITE.whatsapp.href} className="inline-flex min-h-11 items-center text-archo-mist transition-colors hover:text-archo-orange" data-whatsapp="404">
          {SITE.whatsapp.label}
        </a>
      </div>
    </div>
  )
}
