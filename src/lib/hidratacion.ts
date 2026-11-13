/**
 * ¿Ya terminó la primera carga?
 *
 * Los elementos que existen al hidratar ya están pintados (vienen en el HTML
 * prerenderizado): si están en pantalla no se pueden ocultar para animarlos
 * sin un parpadeo. Los que se montan después, en una navegación interna,
 * todavía no se han pintado y sí pueden entrar animados, como antes del
 * prerender.
 *
 * Layout lo marca en un efecto, que corre después de los efectos de layout de
 * toda la página inicial.
 */
let primeraCargaTerminada = false

export function marcarPrimeraCargaTerminada() {
  primeraCargaTerminada = true
}

export function esPrimeraCarga() {
  return !primeraCargaTerminada
}
