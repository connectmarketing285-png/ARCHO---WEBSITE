import PageIntro from '@/components/PageIntro'
import Reveal from '@/components/Reveal'
import { PHASES, PROCESS_PAGE } from '@/data/process'

export default function Process() {
  return (
    <div className="bg-archo-black pt-32 md:pt-44">
      <PageIntro eyebrow={PROCESS_PAGE.eyebrow} title={PROCESS_PAGE.title} />

      <section className="relative px-6 py-32 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          {/* Riel vertical decorativo: acompaña el scroll junto a la lista. */}
          <div aria-hidden="true" className="hidden md:col-span-1 md:block">
            <div className="sticky top-32 h-[60vh] w-px bg-gradient-to-b from-archo-orange/60 via-white/15 to-transparent" />
          </div>

          <ol className="space-y-24 md:col-span-10 md:col-start-2">
            {PHASES.map((phase, index) => (
              <Reveal key={phase.number} as="li" delay={index * 80}>
                <div className="grid gap-8 border-t border-white/10 pt-10 md:grid-cols-12">
                  <p className="flex items-center gap-3 md:col-span-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-archo-orange" />
                    <span className="font-display text-sm text-archo-mist">
                      {PROCESS_PAGE.phaseLabel} {phase.number}
                    </span>
                  </p>

                  <h2 className="font-display text-4xl text-archo-cream md:col-span-4 md:text-6xl">
                    {phase.title}
                  </h2>

                  <p className="text-base leading-relaxed text-archo-mist md:col-span-5 md:col-start-8 md:text-lg">
                    {phase.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
