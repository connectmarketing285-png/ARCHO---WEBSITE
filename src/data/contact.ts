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
    lines: SITE.address.lines.map((text) => ({ text })),
  },
  {
    label: 'Directo',
    lines: [
      { text: SITE.email, href: `mailto:${SITE.email}` },
      { text: SITE.phone.display, href: SITE.phone.href },
      { text: SITE.whatsapp.label, href: SITE.whatsapp.href },
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
    sendingLabel: 'Enviando…',
    /** Se anuncian por aria-live al terminar el envío. */
    successMessage: 'Mensaje enviado. Te respondemos en menos de 24 horas hábiles.',
    errorMessage:
      'No pudimos enviar el mensaje. Escríbenos a admin@archo.com.mx o por WhatsApp.',
  },

  /**
   * El encuadre anterior era el centro de la ciudad, a 2 km largos de la
   * oficina. Ahora se centra en el CP 78269 (22.14049, -100.99786), que es el
   * punto más fiable disponible: ni "Prol. Santos Degollado 1137" ni la colonia
   * Tangamanga resuelven en OpenStreetMap, y el CP viene de la propia dirección.
   *
   * El pie muestra la dirección en vez de coordenadas: las que había eran
   * falsas para esta ubicación, y a quien va a visitar el estudio le sirve más
   * la calle que un par de decimales.
   */
  map: {
    title: 'Zona del estudio ARCHO en San Luis Potosí',
    src: 'https://www.openstreetmap.org/export/embed.html?bbox=-101.0099%2C22.1305%2C-100.9859%2C22.1505&layer=mapnik&marker=22.14049%2C-100.99786',
    caption: 'Prol, Santos Degollado 1137 · Tangamanga, S.L.P.',
  },
} as const
