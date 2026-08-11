/**
 * Obra seleccionada — 6 proyectos, 1:1 del original.
 *
 * `slug` se conserva porque el original enlazaba a fichas de detalle
 * (/projects/torre-monolito…). Esas rutas no existen en esta reconstrucción y
 * no hay contenido capturado para ellas, así que las tarjetas no navegan.
 * Cuando el cliente entregue las fichas, el slug ya está aquí.
 */
export type Project = {
  slug: string
  name: string
  category: string
  location: string
  year: string
  area: string
  /** ID de Unsplash; el ancho lo decide el componente vía srcset. */
  image: string
}

export const PROJECTS_PAGE = {
  eyebrow: 'Índice · Obra seleccionada',
  title: { lead: 'Edificios como', accent: 'argumentos.' },
  lede: 'Una selección reciente de obras en tipologías residencial, cultural, hospitalidad y cívica — cada una, una postura sobre cómo debería habitarse un lugar.',
} as const

export const PROJECTS: readonly Project[] = [
  {
    slug: 'torre-monolito',
    name: 'Torre Monolito',
    category: 'Residencial',
    location: 'San Luis Potosí, MX',
    year: '2025',
    area: '42,500 m²',
    image: 'photo-1545324418-cc1a3fa10c00',
  },
  {
    slug: 'museo-horizonte',
    name: 'Museo Horizonte',
    category: 'Cultural',
    location: 'Querétaro, MX',
    year: '2024',
    area: '11,200 m²',
    image: 'photo-1487958449943-2429e8be8625',
  },
  {
    slug: 'casa-noir',
    name: 'Casa Noir',
    category: 'Residencial',
    location: 'San Miguel de Allende, MX',
    year: '2024',
    area: '1,850 m²',
    image: 'photo-1600585154340-be6161a56a0c',
  },
  {
    slug: 'atelier-corporativo',
    name: 'Atelier Corporativo',
    category: 'Corporativo',
    location: 'Guanajuato, MX',
    year: '2023',
    area: '8,900 m²',
    image: 'photo-1497366216548-37526070297c',
  },
  {
    slug: 'hotel-centro',
    name: 'Hotel Centro',
    category: 'Hospitalidad',
    location: 'San Luis Potosí, MX',
    year: '2023',
    area: '6,400 m²',
    image: 'photo-1551882547-ff40c63fe5fa',
  },
  {
    slug: 'pabellon-quinta',
    name: 'Pabellón Quinta',
    category: 'Cívico',
    location: 'Querétaro, MX',
    year: '2022',
    area: '2,300 m²',
    image: 'photo-1431576901776-e539bd916ba2',
  },
]
