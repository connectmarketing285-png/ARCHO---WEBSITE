/**
 * ID de medición de Google Analytics 4 (flujo web de archo.com.mx).
 *
 * Es público por diseño: viaja en cada petición a Google desde el navegador.
 * Vive aquí y no en index.html para tener un solo sitio donde cambiarlo; el
 * plugin `analyticsHtml` de vite.config.ts lo inyecta en el snippet de
 * index.html al compilar. Vacío desactiva la analítica por completo.
 *
 * ⚠ Requisito legal abierto: con esto el sitio recolecta datos de visitantes y
 * aún faltan el aviso de privacidad y el banner de cookies. Ver README.
 */
export const GA_MEASUREMENT_ID = 'G-WK5M1846RR'
