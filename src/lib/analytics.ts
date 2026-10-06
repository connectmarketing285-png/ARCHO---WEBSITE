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

/**
 * Registra `whatsapp_click` en cada clic a un enlace de WhatsApp del sitio.
 *
 * Nombre propio y no `generate_lead`: Google Ads importa conversiones de GA4
 * por nombre de evento, y `generate_lead` queda para el formulario de contacto
 * (ver README). Con un solo nombre no habría forma de pujar por WhatsApp.
 *
 * Un listener delegado en `document`, y no un onClick por botón: cualquier
 * enlace a wa.me, en cualquier ruta y presente o futuro, dispara el mismo
 * evento sin tocar el componente. `button_location` sale de `data-whatsapp`
 * si el enlace lo trae y, si no, de la zona de la página donde está.
 *
 * Va en fase de captura para correr antes que la navegación y que cualquier
 * `stopPropagation`. El envío tiene que sobrevivir a la descarga de la página:
 * el enlace de /contact abre WhatsApp en la misma pestaña, y en móvil el cambio
 * de app puede congelar la página de inmediato. gtag de GA4 ya envía con
 * `fetch` + `keepalive` (el sucesor de sendBeacon), que el navegador completa
 * aunque la página se descargue. No se pasa `transport_type: 'beacon'`: es de
 * Universal Analytics, GA4 no lo reconoce y lo manda como parámetro basura.
 *
 * Devuelve la función que quita el listener.
 */
export function trackWhatsAppClicks() {
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return
    const link = event.target.closest<HTMLAnchorElement>('a[href^="https://wa.me/"]')
    if (!link) return

    const location =
      link.dataset.whatsapp ??
      (link.closest('header') ? 'cabecera' : link.closest('footer') ? 'pie' : 'contenido')

    window.gtag?.('event', 'whatsapp_click', {
      button_location: location,
      // No `page_path`: gtag lo reserva (herencia de Universal Analytics) y lo
      // descarta como parámetro del evento.
      click_path: window.location.pathname,
      link_url: link.href,
    })
  }

  document.addEventListener('click', onClick, { capture: true })
  return () => document.removeEventListener('click', onClick, { capture: true })
}
