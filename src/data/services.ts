/**
 * Las 7 disciplinas de "03 · Nuestros servicios".
 * Títulos, listas e imágenes 1:1 del original. `image` es el ID de Unsplash;
 * el ancho lo decide el componente vía srcset.
 */
export type Service = {
  number: string
  title: string
  image: string
  alt: string
  items: readonly string[]
}

/** Copy de la página /services. Las 7 disciplinas se reusan de `SERVICES`. */
export const SERVICES_PAGE = {
  eyebrow: 'Práctica · Servicios',
  eyebrowAccent: 'Siete disciplinas',
  title: { lead: 'Un estudio,', accent: 'un espectro completo de obra.' },
  lede: 'Desde el primer croquis de viabilidad hasta el último colado de concreto, cada proyecto lo conduce el mismo equipo: diseño, ingeniería y construcción en diálogo continuo.',
  index: {
    label: 'Índice · 01 / 07',
    hint: 'Pasa el cursor sobre cada disciplina',
  },
  /** Tarjeta de cierre del grid, visible solo en lg (completa la retícula de 3). */
  outro: {
    symbol: '∞',
    heading: '¿Tu proyecto exige una disciplina fuera de este índice?',
    text: 'Conversemos — la mayoría de los encargos comienza con una pregunta así.',
  },
  /** Marca al pie de cada tarjeta, visible en hover. */
  cardTag: '— Disciplina',
  closing: {
    eyebrow: 'Compromiso',
    heading:
      'Aceptamos un número reducido de encargos al año, para conducir cada uno de manera personal.',
  },
} as const

export const SERVICES: readonly Service[] = [
  {
    number: '01',
    title: 'Estructura Metálica',
    image: 'photo-1504307651254-35680f356dfd',
    alt: 'Estructura Metálica',
    items: ['Armaduras', 'Marcos rígidos', 'Naves', 'Herrería'],
  },
  {
    number: '02',
    title: 'Ingeniería',
    image: 'photo-1503387762-592deb58ef4e',
    alt: 'Ingeniería',
    items: [
      'Edificio de concreto',
      'Edificio de acero',
      'Estructuras especiales',
      'Cimentaciones',
      'Reestructuraciones',
      'Diseño de estructuras',
      'Revisión de estructuras',
    ],
  },
  {
    number: '03',
    title: 'Instalaciones',
    image: 'photo-1581094794329-c8112a89af12',
    alt: 'Instalaciones',
    items: [
      'Eléctricas',
      'Hidráulicas',
      'Sanitarias',
      'Drenajes',
      'Fosas sépticas',
      'Iluminación',
      'Voz y datos',
      'Seguridad',
      'Aire acondicionado',
    ],
  },
  {
    number: '04',
    title: 'Estructura de Concreto',
    image: 'photo-1486325212027-8081e485255e',
    alt: 'Estructura de Concreto',
    items: [
      'Edificios',
      'Tanques',
      'Muros de contención',
      'Puentes',
      'Oficinas',
      'Centros comerciales',
    ],
  },
  {
    number: '05',
    title: 'Residencial',
    image: 'photo-1487958449943-2429e8be8625',
    alt: 'Residencial',
    items: ['Campestre', 'Urbanas', 'Interés medio', 'Interés social', 'Interés bancario'],
  },
  {
    number: '06',
    title: 'Carpintería',
    image: 'photo-1556909114-f6e7ad7d3136',
    alt: 'Carpintería',
    items: [
      'Habitacional',
      'Comercial e industrial',
      'Lambrines',
      'Tarimas',
      'Cajas de madera',
      'Maderas finas',
    ],
  },
  {
    number: '07',
    title: 'Varios',
    image: 'photo-1503387837-b154d5074bd2',
    alt: 'Varios',
    items: [
      'Demoliciones',
      'Cancelerías',
      'Estructura falsa',
      'Mantenimiento',
      'Supervisión',
      'Vialidad',
    ],
  },
]
