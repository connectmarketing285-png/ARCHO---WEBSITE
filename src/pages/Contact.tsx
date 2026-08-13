import CareersSection from '@/components/CareersSection'
import ContactForm from '@/components/ContactForm'
import PageIntro from '@/components/PageIntro'
import Reveal from '@/components/Reveal'
import { CONTACT } from '@/data/contact'
import { useNearViewport } from '@/hooks/useNearViewport'

/** Lista de líneas apiladas: área táctil por `min-h-11`, no por `.touch-target`
 *  (el paso entre líneas es menor que 44px y dos pseudo-elementos chocarían). */
const LINK_CLASS =
  'inline-flex min-h-11 items-center transition-colors hover:text-archo-orange md:min-h-0'

export default function Contact() {
  // El mapa de OpenStreetMap arrastra ~770 KB de JS de terceros. No se monta
  // hasta que el usuario se acerca a él: en móvil, la mayoría no llega.
  const [mapRef, mapNear] = useNearViewport<HTMLDivElement>()

  return (
    <div className="bg-archo-black pt-32 md:pt-44">
      <PageIntro
        eyebrow={CONTACT.intro.eyebrow}
        title={CONTACT.intro.title}
        titleClassName="mt-8 max-w-[16ch] text-5xl leading-[0.95] text-archo-cream md:text-8xl"
      />

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="space-y-12 md:col-span-4">
            {CONTACT.details.map((detail) => (
              <div key={detail.label}>
                <p className="text-[11px] uppercase tracking-[0.3em] text-archo-mist">
                  {detail.label}
                </p>
                <ul className="mt-4 text-base text-archo-cream">
                  {detail.lines.map((line) => (
                    <li key={line.text}>
                      {line.href ? (
                        <a href={line.href} className={LINK_CLASS}>
                          {line.text}
                        </a>
                      ) : (
                        line.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <CareersSection />

      <section className="px-6 py-32 md:px-10">
        <Reveal className="mx-auto max-w-[1600px]">
          {/* En móvil el 16/7 del original queda en una franja de ~160px donde no
              se distingue nada; ahí el mapa necesita altura. */}
          <div
            ref={mapRef}
            className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-archo-ink sm:aspect-[16/9] md:aspect-[16/7]"
          >
            {/* La caja mantiene su alto esté o no montado el iframe, así que
                aparecer no provoca desplazamiento de layout. */}
            {mapNear && (
              <iframe
                title={CONTACT.map.title}
                src={CONTACT.map.src}
                loading="lazy"
                className="absolute inset-0 h-full w-full opacity-70 contrast-125 hue-rotate-180 invert saturate-50"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-archo-black/60 via-transparent to-archo-black/20" />
            {/* En móvil la atribución de OpenStreetMap ocupa dos líneas al pie del
                iframe; el pie sube para no encimarse con ella. */}
            <p className="pointer-events-none absolute bottom-16 left-6 right-6 text-[10px] uppercase tracking-[0.24em] text-archo-cream md:bottom-6 md:text-[11px] md:tracking-[0.3em]">
              <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-archo-orange" />
              {CONTACT.map.caption}
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
