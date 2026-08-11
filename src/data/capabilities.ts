import type { IconName } from '@/data/icons'

/** Las 5 tarjetas de "02 · Qué hacemos". Texto 1:1 del original. */
export type Capability = {
  number: string
  icon: IconName
  title: string
  description: string
}

export const CAPABILITIES: readonly Capability[] = [
  {
    number: '01',
    icon: 'compass',
    title: 'Diseño',
    description: 'Conceptualización del proyecto a partir del sitio, el programa y el cliente.',
  },
  {
    number: '02',
    icon: 'volume',
    title: 'Anteproyecto',
    description:
      'Resolución espacial, volumetría y criterios técnicos antes de la planimetría final.',
  },
  {
    number: '03',
    icon: 'blueprint',
    title: 'Planimetría ejecutiva',
    description: 'Documentación técnica precisa lista para construirse y coordinarse en obra.',
  },
  {
    number: '04',
    icon: 'render',
    title: 'Representación gráfica fotorrealista',
    description: 'Renders de alta fidelidad que anticipan la atmósfera y los materiales.',
  },
  {
    number: '05',
    icon: 'headset',
    title: 'Recorrido virtual',
    description: 'Experiencia inmersiva del proyecto antes de levantar el primer muro.',
  },
]

/** Sexta celda del grid: cierre, no es una capacidad más. */
export const CAPABILITIES_OUTRO = {
  symbol: '∞',
  text: 'Un proceso continuo, del concepto a la obra construida.',
  linkLabel: 'Ver disciplinas →',
  linkTo: '/services',
} as const
