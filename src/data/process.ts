/** Las 5 fases de /process, 1:1 del original. */
export type Phase = {
  number: string
  title: string
  description: string
}

export const PROCESS_PAGE = {
  eyebrow: 'Método · Cinco fases',
  title: { lead: 'Cómo una obra', accent: 'se vuelve real.' },
  /** Prefijo de la etiqueta de cada fase: "FASE 01", "FASE 02"… */
  phaseLabel: 'FASE',
} as const

export const PHASES: readonly Phase[] = [
  {
    number: '01',
    title: 'Descubrir',
    description:
      'Comenzamos por el lugar. Sitio, contexto, clima, historia y programa se estudian como una sola conversación. Resultados: tesis del proyecto y dossier de sitio.',
  },
  {
    number: '02',
    title: 'Diseñar',
    description:
      'El diseño conceptual y esquemático se desarrolla en diálogo continuo con nuestros ingenieros. Cada material se prueba a escala 1:1 en taller.',
  },
  {
    number: '03',
    title: 'Desarrollar',
    description:
      'Diseño de detalle, coordinación estructural y de instalaciones, modelo BIM completo y licitación de partidas críticas. El cliente aprueba al nivel de la manija.',
  },
  {
    number: '04',
    title: 'Ejecutar',
    description:
      'La obra la conduce el equipo interno de ARCHO. Un solo director del proyecto, del plano a la entrega. Recorridos semanales, reuniones mensuales con el cliente.',
  },
  {
    number: '05',
    title: 'Acompañar',
    description:
      'Después de la entrega seguimos presentes: revisiones anuales, auditorías de desempeño y respuesta garantizada en menos de 24 horas durante los primeros cinco años.',
  },
]
