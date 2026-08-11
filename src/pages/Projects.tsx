import PageIntro from '@/components/PageIntro'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
import { PROJECTS, PROJECTS_PAGE } from '@/data/projects'

/**
 * Composición editorial del índice: cada obra ocupa un ancho y un desfase
 * distintos para romper la retícula. Vive aquí y no en `data/projects.ts`
 * porque son decisiones de maquetación, no contenido que el cliente edite.
 *
 * En Tailwind v4 `translate-y-*` usa la propiedad `translate`, no `transform`,
 * así que el desfase convive con el `transform` del .reveal sin pisarlo.
 */
const LAYOUT = [
  { className: 'md:col-span-7', delay: 0 },
  { className: 'md:col-span-5 md:col-start-8 md:translate-y-32', delay: 80 },
  { className: 'md:col-span-6 md:col-start-2', delay: 160 },
  { className: 'md:col-span-5 md:col-start-8 md:translate-y-16', delay: 0 },
  { className: 'md:col-span-7', delay: 80 },
  { className: 'md:col-span-5 md:col-start-8 md:translate-y-24', delay: 160 },
]

export default function Projects() {
  return (
    <div className="bg-archo-black pt-32 md:pt-44">
      <PageIntro
        eyebrow={PROJECTS_PAGE.eyebrow}
        title={PROJECTS_PAGE.title}
        lede={PROJECTS_PAGE.lede}
      />

      <section className="mt-24 px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-x-8 gap-y-24 md:grid-cols-12">
          {PROJECTS.map((project, index) => {
            const layout = LAYOUT[index]

            return (
              <Reveal key={project.slug} delay={layout.delay} className={layout.className}>
                <ProjectCard project={project} priority={index === 0} />
              </Reveal>
            )
          })}
        </div>
      </section>
    </div>
  )
}
