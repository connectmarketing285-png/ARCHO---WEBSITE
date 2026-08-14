export type NavItem = {
  label: string
  to: string
}

/** Orden y etiquetas exactos del nav del sitio original. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Proyectos', to: '/projects' },
  { label: 'Servicios', to: '/services' },
  // Ruta en español a diferencia del resto: es la página con más intención de
  // búsqueda local ("inmuebles san luis potosí") y ahí el idioma de la URL sí
  // cuenta. Las demás se quedan como estaban para no romper enlaces.
  { label: 'Inmuebles', to: '/inmuebles' },
  { label: 'Estudio', to: '/about' },
  { label: 'Proceso', to: '/process' },
  { label: 'Contacto', to: '/contact' },
]

/** El índice del footer omite "Inicio", igual que en el original. */
export const FOOTER_INDEX: readonly NavItem[] = NAV_ITEMS.slice(1)
