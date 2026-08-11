/**
 * El original pedía w=1800 / w=1200 fijos sin importar el dispositivo.
 * Unsplash sirve cualquier ancho cambiando el parámetro `w`, así que aquí se
 * genera un srcset con anchos móviles reales.
 */

/** Anchos por defecto: los dos primeros cubren móvil (375-428 CSS px a 1x/2x). */
export const RESPONSIVE_WIDTHS = [640, 828, 1200, 1800] as const

export function unsplashUrl(id: string, width: number): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`
}

export function unsplashSrcSet(
  id: string,
  widths: readonly number[] = RESPONSIVE_WIDTHS,
): string {
  return widths.map((width) => `${unsplashUrl(id, width)} ${width}w`).join(', ')
}
