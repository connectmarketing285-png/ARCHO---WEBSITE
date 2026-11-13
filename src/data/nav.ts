export type NavItem = {
  label: string
  to: string
}

/**
 * Orden y etiquetas del nav del sitio original, más Blog: enlazarlo desde
 * todas las páginas es lo que hace que Google lo descubra y lo rastree.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Proyectos', to: '/projects' },
  { label: 'Servicios', to: '/services' },
  { label: 'Estudio', to: '/about' },
  { label: 'Proceso', to: '/process' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contacto', to: '/contact' },
]

/** El índice del footer omite "Inicio", igual que en el original. */
export const FOOTER_INDEX: readonly NavItem[] = NAV_ITEMS.slice(1)
