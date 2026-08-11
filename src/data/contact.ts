import { SITE } from '@/data/site'

export type ContactLine = {
  text: string
  /** Si está presente, la línea se renderiza como enlace (tel: / mailto:). */
  href?: string
}

export type FormField = {
  id: 'name' | 'email' | 'type' | 'message'
  label: string
  placeholder: string
} & ({ control: 'input'; type: 'text' | 'email' } | { control: 'textarea'; rows: number })

/**
 * Mismos datos que el footer y el menú móvil: una sola fuente en SITE.
 * Va anotado y fuera del `as const` para que `href` sea opcional en todas las
 * líneas y no solo en las que lo traen.
 */
const DETAILS: readonly { label: string; lines: readonly ContactLine[] }[] = [
  {
    label: 'Estudio',
    lines: [{ text: SITE.address.street }, { text: SITE.address.city }],
  },
  {
    label: 'Directo',
    lines: [
      { text: SITE.email, href: `mailto:${SITE.email}` },
      { text: SITE.phone.display, href: SITE.phone.href },
    ],
  },
  {
    label: 'Horario',
    lines: [{ text: SITE.hours }],
  },
]

export const CONTACT = {
  intro: {
    eyebrow: `Contacto · ${SITE.coverage}`,
    title: { lead: 'Inicia una', accent: 'conversación.' },
  },

  details: DETAILS,

  form: {
    fields: [
      { id: 'name', label: 'Nombre', placeholder: '—', control: 'input', type: 'text' },
      { id: 'email', label: 'Correo', placeholder: '—', control: 'input', type: 'email' },
      { id: 'type', label: 'Tipo de proyecto', placeholder: '—', control: 'input', type: 'text' },
      {
        id: 'message',
        label: 'Mensaje',
        placeholder: 'Cuéntanos sobre el sitio y el alcance…',
        control: 'textarea',
        rows: 5,
      },
    ] satisfies readonly FormField[],
    submitLabel: 'Enviar mensaje',
  },

  map: {
    title: 'Estudio ARCHO en San Luis Potosí',
    src: 'https://www.openstreetmap.org/export/embed.html?bbox=-101.0150%2C22.1250%2C-100.9550%2C22.1650&layer=mapnik',
    caption: 'San Luis Potosí · 22.1565° N, 100.9855° O',
  },
} as const
