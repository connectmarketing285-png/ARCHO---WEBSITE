# ARCHO---WEBSITE
Repositorio para documentos de sitio web de Archo

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
