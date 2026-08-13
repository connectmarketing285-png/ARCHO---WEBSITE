import { SITE } from '@/data/site'

/** 5 MB: un CV en PDF rara vez pasa de 1, y el límite evita que alguien
 *  intente subir un portafolio de 80 MB y se quede esperando. */
export const CV_MAX_BYTES = 5 * 1024 * 1024

export type CareersField = {
  id: 'nombre' | 'correo' | 'area'
  label: string
  placeholder: string
  type: 'text' | 'email'
}

export const CAREERS = {
  eyebrow: 'Únete al equipo',
  heading: { lead: 'Construimos con quien', accent: 'entiende la obra.' },
  lede: 'Buscamos arquitectos, ingenieros y personal de obra. Déjanos tu CV: revisamos cada candidatura y guardamos tu perfil para las vacantes que abrimos durante el año.',

  fields: [
    { id: 'nombre', label: 'Nombre', placeholder: '—', type: 'text' },
    { id: 'correo', label: 'Correo', placeholder: '—', type: 'email' },
    { id: 'area', label: 'Área', placeholder: 'Arquitectura, obra…', type: 'text' },
  ] satisfies readonly CareersField[],

  file: {
    label: 'CV',
    /** Rótulos propios: el botón nativo se rotula en el idioma del navegador. */
    buttonLabel: 'Adjuntar archivo',
    emptyLabel: 'Ningún archivo seleccionado',
    hint: 'PDF o Word · máximo 5 MB',
    accept: '.pdf,.doc,.docx,application/pdf',
    tooBig: 'El archivo pesa más de 5 MB. Comprímelo o envíalo por correo.',
  },

  submitLabel: 'Enviar candidatura',
  sendingLabel: 'Enviando…',
  successMessage: 'Recibimos tu candidatura. Si tu perfil encaja con una vacante, te contactamos.',
  errorMessage: `No pudimos enviar la candidatura. Escríbenos a ${SITE.email} con tu CV adjunto.`,

  /**
   * Lo que se muestra mientras no haya servicio de subida contratado. El correo
   * admite adjuntos de sobra, así que la vía funciona desde el primer día:
   * más vale un enlace que sí entrega que un formulario que se traga el CV.
   */
  fallback: {
    label: 'Enviar CV por correo',
    href: `mailto:${SITE.email}?subject=${encodeURIComponent('Candidatura — ARCHO')}&body=${encodeURIComponent(
      'Hola, me interesa formar parte del equipo de ARCHO.\n\nNombre:\nÁrea de interés:\n\n(Adjunta tu CV a este correo antes de enviarlo.)',
    )}`,
    note: 'Adjunta tu CV al correo. Te respondemos en cuanto lo revisemos.',
  },
} as const
