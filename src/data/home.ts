import { SITE } from '@/data/site'

/**
 * Copy de la home, 1:1 del original.
 *
 * Los títulos mixtos se guardan partidos en `lead` + `accent`: la segunda
 * parte se renderiza en `italic font-light text-archo-mist`, que es el patrón
 * tipográfico del sitio. Así el markup no lleva texto dentro.
 */
export const HOME = {
  hero: {
    eyebrow: 'Profesionalismo · Calidad · Seguridad',
    title: 'ARCHO',
    lede: 'Estudio integral de arquitectura y construcción — diseño, ingeniería y obra bajo un mismo techo.',
    scrollHint: 'Desliza ↓',
  },

  video: {
    src: 'https://cdn.coverr.co/videos/coverr-an-architectural-piece-1572/1080p.mp4',
    poster: 'photo-1486325212027-8081e485255e',
    posterAlt: '',
    heading: {
      lead: 'Cumplimos en tiempo. Superamos en calidad.',
      accent: 'Construimos para durar.',
    },
  },

  about: {
    eyebrow: '01 · ¿Quiénes somos?',
    heading: 'Diseño arquitectónico y ejecución de obra como un solo proceso.',
    paragraphs: [
      'Somos una constructora que integra el diseño arquitectónico y la ejecución de obra como un solo proceso. Desarrollamos proyectos desde una lógica donde lo que se diseña puede construirse de forma eficiente, evitando la desconexión común entre proyecto y obra. Cada decisión de diseño considera su viabilidad técnica, costos y proceso constructivo desde el inicio.',
      'Nuestro enfoque no es únicamente proyectar, sino materializar correctamente. Participamos en todas las etapas del proyecto, asegurando control, continuidad y coherencia entre la propuesta arquitectónica y su ejecución. Entendemos que la arquitectura no termina en los planos, sino en la obra construida.',
    ],
    linkLabel: 'Conoce más del estudio',
    linkTo: '/about',
    image: 'photo-1487958449943-2429e8be8625',
    imageAlt: 'Estudio en obra',
  },

  capabilities: {
    eyebrow: '02 · Qué hacemos',
    eyebrowAccent: 'Arquitectura',
    heading: {
      lead: 'Diseñamos para construir.',
      accent: 'Cada decisión, ya pensada en obra.',
    },
    lede: 'Nuestra práctica arquitectónica abarca desde el primer trazo conceptual hasta la representación inmersiva del proyecto — un proceso continuo, sin rupturas entre el papel y la materia.',
  },

  services: {
    eyebrow: '03 · Nuestros servicios',
    heading: 'Un espectro completo de posibilidades.',
    linkLabel: 'Ver servicios ↗',
    linkTo: '/services',
  },

  contact: {
    eyebrow: '04 · Contacto',
    heading: 'No esperes un día más para iniciar tu proyecto.',
    lede: `${SITE.coverage} — y obras a lo largo de México.`,
    blocks: [
      { label: 'Estudio', lines: SITE.address.lines },
      { label: 'Directo', lines: [SITE.email, SITE.phone.display] },
    ],
    linkLabel: 'Iniciar una conversación →',
    linkTo: '/contact',
  },
} as const

/** Escalonados observados en el original. */
export const REVEAL_DELAYS = {
  section: [0, 100, 200],
  grid: [0, 80, 160, 240],
} as const
