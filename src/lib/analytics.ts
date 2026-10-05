declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Registra una vista de página en GA4.
 *
 * Esto es una SPA: gtag solo ve la carga inicial del documento, así que cada
 * cambio de ruta se notifica a mano. La vista inicial también sale de aquí
 * (index.html configura gtag con `send_page_view: false`), para que todas las
 * vistas pasen por el mismo camino y ninguna se cuente doble.
 *
 * Hay que llamarla después de actualizar `document.title`: si no, la vista se
 * registra con el título de la página anterior.
 *
 * Sin gtag (en desarrollo, o con un bloqueador) no hace nada. Mientras gtag.js
 * no ha terminado de cargar, la llamada queda en `dataLayer` y se envía al
 * llegar.
 */
export function trackPageView() {
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title,
  })
}
