export type NavItem = {
  label: string
  to: string
}

/** Orden y etiquetas exactos del nav del sitio original. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Proyectos', to: '/projects' },
  { label: 'Servicios', to: '/services' },
  { label: 'Estudio', to: '/about' },
  { label: 'Proceso', to: '/process' },
  { label: 'Contacto', to: '/contact' },
]

/** El índice del footer omite "Inicio", igual que en el original. */
export const FOOTER_INDEX: readonly NavItem[] = NAV_ITEMS.slice(1)
