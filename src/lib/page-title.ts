import { NAV_ITEMS } from '@/data/nav'
import { SITE } from '@/data/site'

export const NOT_FOUND_TITLE = `Página no encontrada — ${SITE.name}`

/**
 * Título del documento por ruta. Lo usan Layout (en cada navegación del
 * cliente) y el prerender (en el <title> del HTML), para que los dos digan lo
 * mismo. Una ruta que no está en el menú es el 404.
 */
export function pageTitle(pathname: string) {
  const item = NAV_ITEMS.find((i) => i.to === pathname)
  if (!item) return NOT_FOUND_TITLE
  return item.to === '/' ? SITE.title : `${item.label} — ${SITE.name}`
}
