/**
 * "Diseño de Cocinas en Querétaro: Guía 2027" → "diseno-de-cocinas-en-queretaro-guia-2027"
 *
 * Minúsculas y sin acentos ni eñes: NFD separa cada tilde de su letra y el
 * rango U+0300–U+036F (marcas diacríticas combinantes) la descarta. Cualquier
 * otra cosa que no sea letra o número se vuelve guion, sin guiones al
 * principio, al final ni repetidos. Máximo 96 caracteres, sin cortar en guion.
 *
 * En archivo propio, sin dependencias de Sanity, para poder probarlo con Node.
 */
export function slugificar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/, '')
}

/** El formato que debe tener una URL válida: el mismo que produce `slugificar`. */
export const FORMATO_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
