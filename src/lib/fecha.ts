/**
 * "13 de noviembre de 2026".
 *
 * Con zona horaria fija, la de la oficina. Sin ella, el HTML prerenderizado
 * (Vercel compila en UTC) y el navegador (hora de México) pueden caer en días
 * distintos para un artículo publicado de noche: el texto no coincidiría al
 * hidratar, y la fecha dependería de dónde se lee.
 */
const FORMATO = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Mexico_City',
})

export const formatoFecha = (iso: string) => FORMATO.format(new Date(iso))
