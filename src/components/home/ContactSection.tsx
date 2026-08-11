import { Link } from 'react-router-dom'

import Reveal from '@/components/Reveal'
import { HOME } from '@/data/home'
import { SITE } from '@/data/site'

/** Única sección sobre fondo claro: el logo va invertido, como en el original. */
export default function ContactSection() {
  const { contact } = HOME

  return (
    <section className="relative overflow-hidden bg-archo-cream px-6 py-32 text-archo-black md:px-10">
      <img
        src={SITE.logo}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute -bottom-20 -right-20 w-[520px] max-w-[60vw] select-none opacity-[0.05]"
        style={{ filter: 'invert(1)' }}
      />

      <div className="relative mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <Reveal delay={0} className="md:col-span-7">
          <span className="mb-8 inline-flex items-center gap-3 opacity-80">
            <img
              src={SITE.logo}
              alt={SITE.name}
              width={36}
              height={36}
              className="h-9 w-9 select-none object-contain"
              style={{ filter: 'invert(1)' }}
              draggable={false}
            />
          </span>

          <p className="text-[11px] uppercase tracking-[0.3em] text-archo-black/60">
            {contact.eyebrow}
          </p>
          <h2 className="font-display mt-8 text-balance text-5xl leading-[1.02] md:text-7xl lg:text-8xl">
            {contact.heading}
          </h2>
          <p className="mt-10 max-w-md text-base text-archo-black/70 md:text-lg">{contact.lede}</p>
        </Reveal>

        <Reveal delay={150} className="space-y-8 self-end md:col-span-4 md:col-start-9">
          {contact.blocks.map((block) => (
            <div key={block.label}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-archo-black/50">
                {block.label}
              </p>
              <p className="mt-3 text-base">
                {block.lines.map((line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}

          <Link
            to={contact.linkTo}
            className="inline-flex min-h-11 items-center gap-4 border-b border-archo-black pb-2 text-sm uppercase tracking-[0.24em]"
          >
            {contact.linkLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
