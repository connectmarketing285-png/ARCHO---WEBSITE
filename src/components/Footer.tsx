import { Link } from 'react-router-dom'

import Logo from '@/components/Logo'
import { FOOTER_INDEX } from '@/data/nav'
import { SITE } from '@/data/site'

/** Área táctil de 44px en móvil; en desktop vuelve al ritmo compacto del original. */
const LINK_CLASS =
  'inline-flex min-h-11 items-center transition-colors hover:text-archo-cream md:min-h-0 md:py-0'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-archo-black text-archo-mist">
      <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1600px] px-6 py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          {/* Identidad */}
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-8 max-w-sm font-display text-2xl leading-tight text-archo-cream md:text-3xl">
              {SITE.footerTagline.lead} <span className="text-archo-orange">—</span>{' '}
              {SITE.footerTagline.rest}
            </p>
          </div>

          {/* Estudio */}
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-archo-mist/70">Estudio</p>
            <ul className="mt-6 space-y-2 text-sm text-archo-cream">
              {SITE.address.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li className="pt-3 text-archo-mist">
                <a href={SITE.phone.href} className={LINK_CLASS}>
                  {SITE.phone.display}
                </a>
              </li>
              <li className="text-archo-mist">
                <a href={`mailto:${SITE.email}`} className={LINK_CLASS}>
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Índice */}
          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.24em] text-archo-mist/70">Índice</p>
            <ul className="mt-6 space-y-2 text-sm">
              {FOOTER_INDEX.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes */}
          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.24em] text-archo-mist/70">Síguenos</p>
            <ul className="mt-6 space-y-2 text-sm">
              {SITE.social.map((network) => (
                <li key={network.label}>
                  <a href={network.href} className={LINK_CLASS}>
                    {network.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/5 pt-8 text-[11px] uppercase tracking-[0.24em] text-archo-mist/60 md:flex-row md:items-center md:justify-between">
          <span>{SITE.copyright}</span>
          <span>{SITE.coverage}</span>
        </div>
      </div>
    </footer>
  )
}
