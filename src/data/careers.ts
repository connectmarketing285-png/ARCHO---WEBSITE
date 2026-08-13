import { SITE } from '@/data/site'

export const CAREERS = {
  eyebrow: 'Únete al equipo',
  heading: { lead: 'Construimos con quien', accent: 'entiende la obra.' },
  lede: 'Buscamos arquitectos, ingenieros y personal de obra. Déjanos tu CV: revisamos cada candidatura y guardamos tu perfil para las vacantes que abrimos durante el año.',

  /**
   * Formulario de Tally, que es quien recibe el CV: guarda el archivo y avisa
   * por correo. Los parámetros vienen de su panel (Share → Embed → Standard):
   * fondo transparente para que no salga un recuadro blanco sobre el fondo
   * oscuro, título oculto porque ya lo pone la página, alineado a la izquierda
   * y alto dinámico para que no quede recortado.
   *
   * No es un secreto ni configuración de entorno: es una URL pública que
   * aparece en el HTML de la página, así que vive aquí junto al resto del
   * contenido y se puede cambiar sin tocar Vercel.
   */
  embed: {
    src: 'https://tally.so/embed/pbqZ11?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
    title: 'Formulario de candidatura — envía tu CV',
  },

  /**
   * Vía alternativa, siempre visible. Un bloqueador de rastreadores puede
   * cortar el iframe de Tally sin que el visitante entienda por qué; el correo
   * admite adjuntos y no depende de nadie.
   */
  fallback: {
    note: '¿Prefieres el correo?',
    label: 'Envíanos tu CV a admin@archo.com.mx',
    href: `mailto:${SITE.email}?subject=${encodeURIComponent('Candidatura — ARCHO')}&body=${encodeURIComponent(
      'Hola, me interesa formar parte del equipo de ARCHO.\n\nNombre:\nÁrea de interés:\n\n(Adjunta tu CV a este correo antes de enviarlo.)',
    )}`,
  },
} as const
