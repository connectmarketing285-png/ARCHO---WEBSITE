# ARCHO---WEBSITE
Repositorio para documentos de sitio web de Archo

## Analítica (Google Analytics 4)

- **ID de medición:** `G-WK5M1846RR`, definido en `src/data/analytics.ts`. Vaciarlo desactiva la analítica.
- **Carga:** el snippet está en `index.html`; el plugin `analyticsHtml` de `vite.config.ts` le inyecta el ID al compilar y lo quita en `npm run dev` (el desarrollo no cuenta como tráfico). `gtag.js` se pide tras el evento `load`, en un hueco ocioso, fuera del camino crítico.
- **Vistas de página:** es una SPA, así que `page_view` lo dispara React en cada cambio de ruta (`PageView` en `src/components/Layout.tsx` → `src/lib/analytics.ts`), con la ruta y el título de cada página. La configuración de gtag lleva `send_page_view: false` para que la vista inicial no se cuente doble.
- **Configuración obligatoria en el panel de GA4:** Administrar → Flujos de datos → (flujo web) → Medición mejorada → engrane de *Vistas de página* → desactivar **"Cambios de página basados en eventos del historial del navegador"**. Si sigue activo, cada navegación interna se registra dos veces (lo hace GA4 y lo hace el sitio).
- **Coste medido (Lighthouse móvil, home, mediana de 5 corridas intercaladas, 2026-10-05):** TBT 93 → 233 ms, rendimiento 92 → 88, +193 KB transferidos. LCP y FCP sin cambio.

### Datos que no hay que volver a suponer

- **El formulario de contacto es Web3Forms, no Tally.** Lo envía nuestro propio código (`src/lib/contact-form.ts`) con `fetch` a la API de Web3Forms.
- **Tally solo se usa para los CV** (sección "Únete al equipo" en `/contact`, `src/components/TallyEmbed.tsx`).
- **gtag sí registra las navegaciones internas** de la SPA cuando la medición mejorada tiene activado "Cambios de página basados en eventos del historial del navegador". Por eso esa opción tiene que estar desactivada: las vistas las envía el sitio.

### Conversiones — plan aprobado, SIN implementar

En espera hasta revisar `ads_conversion_Contacto_1`, una conversión que ya existe en la propiedad (parece venir de la vinculación con Google Ads). Se dispara con solo **visitar** `/contact`, así que cuenta visitas como si fueran contactos. No implementar lo de abajo hasta aclarar qué hacer con ella.

1. **Contacto → `generate_lead`.** Se envía cuando Web3Forms confirma el envío (respuesta correcta de `sendContactForm`), no al pulsar el botón. Sin página de gracias ni postMessage: el envío pasa por nuestro código.
2. **Solicitudes de empleo → evento aparte** (no `generate_lead`: un CV no es un cliente potencial). Se escucha el `postMessage` del iframe de Tally con el evento `Tally.FormSubmitted` y se descarta cualquier mensaje cuyo `event.origin` no sea exactamente `https://tally.so`.

Se descartó una página de gracias: en una SPA obliga a añadir una ruta sin indexar, y se infla con recargas y visitas directas.

### ⚠ Requisito legal abierto: aviso de privacidad y banner de cookies

Desde que se activa GA4, el sitio **recolecta datos de los visitantes** (cookies `_ga`, identificador de cliente, páginas visitadas, dispositivo y ubicación aproximada). El **aviso de privacidad** y el **banner de consentimiento de cookies** están **pendientes del cliente**. Hasta que lleguen, el sitio mide sin informar ni pedir consentimiento.

Cuando lleguen hay que:

1. Publicar el aviso de privacidad y enlazarlo desde el pie y los formularios.
2. Montar el banner y conectar Consent Mode v2 de Google (`gtag('consent', 'default', …)` antes del `config` en `index.html`) para que GA4 no ponga cookies hasta que el visitante acepte.

## Favicon

Todos los iconos salen del mismo dibujo, generado desde `brand/ISOTIPO BLANCO@4x.png`:

| Archivo | Tamaño | Uso |
|---|---|---|
| `public/favicon.ico` | 16, 32, 48 | Pestañas y lectores que piden `/favicon.ico` sin leer el HTML |
| `public/icon-192.png` | 192×192 | `rel="icon"`: el que toma Google para los resultados |
| `public/icon-512.png` | 512×512 | Manifest |
| `public/apple-touch-icon.png` | 180×180 | iOS (pone sus propias esquinas redondeadas) |
| `public/site.webmanifest` | — | Declara el 192 y el 512 |

**Cómo está hecho** (para regenerarlo igual):

- **Fondo opaco `#0A0A0A`** (el `theme-color`), sin canal alfa. Google rellena lo transparente con blanco, y el isotipo es blanco.
- **Isotipo al 64 % del alto del cuadro** (es más alto que ancho). Google lo recorta a círculo: el píxel más lejano queda al 83 % del radio, con margen.
- **Centrado óptico:** la forma pesa a la izquierda (el centroide de masa está un 6 % del ancho a la izquierda del centro de la caja). El punto que va al centro está a medio camino entre el centro de la caja y el centroide, y se sube un 1 % del lado porque la base es más ancha que la parte de arriba.
- **Sin icono `maskable`:** su zona segura es el 80 % del lado y las puntas llegan al 83 %; Android las recortaría. Si algún día hace falta, generar una versión aparte al 60 %.
- **Google pide múltiplos de 48 px**, por eso el `rel="icon"` declarado es el de 192 y no el de 512.
- **`/favicon.png` ya no existe:** tenía 1564×1920 (no era cuadrado), era transparente y llegaba al borde. `vercel.json` redirige esa URL con un 301 a `/icon-192.png`.
