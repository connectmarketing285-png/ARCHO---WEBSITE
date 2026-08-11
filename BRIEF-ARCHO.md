# BRIEF — Reconstrucción sitio ARCHO

## Contexto

El sitio original (archo.com.mx) fue generado con **Lovable** y desplegado en Vercel. Se perdieron los accesos, así que se reconstruye desde cero usando el HTML renderizado y el CSS compilado como especificación.

**Material en `/referencia`:**
- `index.html`, `projects.html`, `services.html`, `about.html`, `process.html`, `contact.html` — DOM renderizado de cada ruta
- `styles-C_yzityS.css` — CSS compilado de Tailwind v4
- `archo-logo-KrX16ZWN.png`, `favicon.png`

Estos archivos son **especificación, no código a copiar**. Son output de React ya renderizado; hay que reescribirlos como componentes.

---

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router — rutas: `/`, `/projects`, `/services`, `/about`, `/process`, `/contact`
- **Sin dependencias de animación.** El original usa Intersection Observer puro (ver sección Reveal). No hace falta Framer Motion.

El original usaba TanStack Start con SSR. Se descarta a propósito: para 6 páginas estáticas sin datos dinámicos, una SPA es más simple de mantener y despliega igual en Vercel.

---

## ⚠️ No copiar el CSS de referencia

`styles-C_yzityS.css` pesa 123 KB y **la mayor parte es basura**: shadcn/ui completo (Radix, cmdk, recharts, sidebar, accordion, calendar…) que el template de Lovable incluye por defecto y este sitio nunca usa. Del archivo solo sirven los tokens y tres clases custom, listados abajo.

Construir el CSS desde cero con esos valores. El resultado debe rondar los 15-20 KB.

---

## Sistema de diseño (valores exactos)

### Tokens — `@theme` de Tailwind v4

```css
--radius: 0.25rem;

--archo-black:        oklch(15% 0 0);
--archo-ink:          oklch(22% 0.015 230);
--archo-petrol-deep:  oklch(34% 0.045 230);
--archo-petrol:       oklch(52% 0.06 230);
--archo-cream:        oklch(95% 0.012 90);
--archo-mist:         oklch(82% 0.008 180);
--archo-orange:       oklch(66% 0.19 42);

--border: oklch(100% 0 0 / 0.08);
--input:  oklch(100% 0 0 / 0.12);
--ring:   var(--archo-orange);
```

`petrol` y `petrol-deep` están definidos pero apenas se usan. Mantenerlos por consistencia.

### Tipografía

```css
--font-display: "Inter Tight", "Inter", system-ui, sans-serif;
--font-sans:    "Inter", system-ui, sans-serif;
```

Google Fonts: `Inter Tight` 300/400/500/600 + `Inter` 300/400/500, con `display=swap`.

### Clases custom — copiar literal

```css
.font-display {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
}

.blueprint-grid {
  background-image:
    linear-gradient(90deg, #ffffff0a 1px, transparent 1px),
    linear-gradient(#ffffff0a 1px, transparent 1px);
  background-size: 80px 80px;
}

.blueprint-grid-fine {
  background-image:
    linear-gradient(90deg, #ffffff06 1px, transparent 1px),
    linear-gradient(#ffffff06 1px, transparent 1px);
  background-size: 24px 24px;
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity   1s cubic-bezier(.22, 1, .36, 1),
    transform 1s cubic-bezier(.22, 1, .36, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
```

### Patrones tipográficos recurrentes

- **Títulos mixtos:** texto normal + segunda parte en `italic font-light text-archo-mist`
- **Eyebrows:** `text-[11px] uppercase tracking-[0.3em] text-archo-mist`
- **Numeración de sección:** `01 · ¿Quiénes somos?`, `02 · Qué hacemos`…
- **Hero H1 (home):** `text-[28vw] md:text-[22vw] xl:text-[20rem]`, `leading-[0.82] tracking-[-0.04em]`
- **Contenedor:** `max-w-[1600px]`, padding `px-6 md:px-10`
- **Ritmo vertical:** `py-32 md:py-44`

---

## Componentes

### Layout
- **`Header`** — fijo, `bg-transparent` con `transition-colors duration-500`. Logo + nav desktop + indicador "Estudio abierto · 26" (punto naranja con `shadow-[0_0_12px_var(--archo-orange)]`) + hamburguesa en móvil. Altura `h-16 md:h-20`.

  **Estado scrolled** — verificado contra el sitio original en vivo (no aparece en el HTML capturado porque todas las capturas están en scroll 0). A partir de 24px de scroll:

  ```
  fixed inset-x-0 top-0 z-50 transition-colors duration-500
  bg-archo-black/80 backdrop-blur-md border-b border-white/5
  ```
- **`MobileMenu`** — no existe en el original capturado; se diseña desde cero. **Derivar toda la estética del sistema ya definido, sin inventar lenguaje visual nuevo.** Especificación abajo.
- **`Footer`** — grid de 4 columnas: identidad + estudio + índice + redes. Fondo con `blueprint-grid-fine` al 40% de opacidad.

### Reveal

```tsx
// Intersection Observer: añade .is-visible al entrar en viewport
// Prop `delay` → style={{ transitionDelay: `${delay}ms` }}
// Escalonado observado: 0 / 80 / 160 / 240ms en grids
//                       0 / 100 / 150 / 200ms en secciones
```

### Cards
- **`ServiceCard`** — número, ícono SVG (`stroke-width:1`, `stroke-linecap:square`), título, descripción, línea que crece `w-8` → `w-20` en hover (duration 700ms). Fondo `archo-ink` → `archo-black` en hover.
- **`ProjectCard`** — imagen `aspect-[4/5]` con overlay gradiente, número, línea naranja. Hover: `scale-[1.04]` + opacidad 80→100, `duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]`.

### Contador animado (`/about`)
Sección "El estudio en cifras" con números que animan al entrar en viewport. **Los valores reales no están en el HTML capturado** (renderizan client-side desde 0). Ver Pendientes.

---

## Contenido por página

| Ruta | H1 | Estructura |
|---|---|---|
| `/` | ARCHO (hero gigante) | Hero → video → quiénes somos → qué hacemos (6 cards) → servicios (7 cards) → contacto |
| `/projects` | Edificios como *argumentos.* | 6 proyectos: Torre Monolito, Museo Horizonte, Casa Noir, Atelier Corporativo, Hotel Centro, Pabellón Quinta |
| `/services` | Un estudio, un espectro completo de obra. | 7 disciplinas + cierre |
| `/about` | Más allá de lo evidente. | Manifiesto → 01 Método (4 pasos) → 02 Visión → 03 Valores (4) → cifras → CTA |
| `/process` | Cómo una obra se vuelve real. | 5 fases: Descubrir, Diseñar, Desarrollar, Ejecutar, Acompañar |
| `/contact` | Inicia una conversación. | Datos + horario + formulario |

---

## Datos del cliente

```
Dirección:  Manuel J. Cloutier 1129, San Luis Potosí, S.L.P.
Email:      admin@archo.com.mx
Teléfono:   +52 444 767 5474
Horario:    Lun — Vie · 09:00 — 19:00 CST
Cobertura:  San Luis Potosí · Querétaro · Guanajuato
Fundación:  2011 (según /about — VERIFICAR)
```

---

## SEO

```
Title:       ARCHO — Diseño y construcción, un solo proceso.
Description: ARCHO es un estudio integral de arquitectura y construcción
             con presencia en San Luis Potosí, Querétaro y Guanajuato.
Author:      ARCHO Estudio
Theme-color: #0A0A0A
```

**Cambiar el `og:image`:** el original apunta a un preview de Lovable en `pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/...`. Esa URL puede morir en cualquier momento. Generar imagen OG propia y servirla desde el proyecto.

---

## Assets

**12 imágenes de Unsplash** (IDs únicos):

```
photo-1431576901776-e539bd916ba2   photo-1503387837-b154d5074bd2
photo-1486325212027-8081e485255e   photo-1504307651254-35680f356dfd
photo-1487958449943-2429e8be8625   photo-1545324418-cc1a3fa10c00
photo-1497366216548-37526070297c   photo-1551882547-ff40c63fe5fa
photo-1503387762-592deb58ef4e      photo-1556909114-f6e7ad7d3136
photo-1581094794329-c8112a89af12   photo-1600585154340-be6161a56a0c
```

Formato: `https://images.unsplash.com/{id}?auto=format&fit=crop&w={ancho}&q=80`

**Video del hero (home, sección 2):**
`https://cdn.coverr.co/videos/coverr-an-architectural-piece-1572/1080p.mp4`
Con poster de Unsplash como fallback. `autoplay muted loop playsinline`.

**Logo:** se usa con `filter:invert(1)` sobre fondos claros (sección de contacto en `archo-cream`).

---

## 📱 Prioridad móvil

**La mayor parte del tráfico va a llegar desde celular.** El móvil no es una adaptación del desktop aquí — es el caso principal. Diseñar y probar en móvil primero, luego escalar a desktop.

Implicaciones concretas más allá del menú:

- **El video del hero pesa.** `autoplay` en 1080p sobre datos móviles es caro y en iOS a veces ni arranca. Servir el `poster` de inmediato y cargar el video solo en pantallas `md:` para arriba, o con `preload="none"` y carga diferida.
- **Imágenes responsivas.** El original pide `w=1800` y `w=1200` sin importar el dispositivo. Usar `srcset` con anchos móviles (`w=640`, `w=828`) — Unsplash lo soporta cambiando el parámetro `w`.
- **El hero `text-[28vw]`** en pantallas angostas: verificar que "ARCHO" no se corte ni desborde en 320px.
- **Áreas táctiles** mínimo 44×44px en nav, botones y links del footer.

  **Regla de implementación** — hay dos mecanismos y no son intercambiables:

  | Caso | Mecanismo | Por qué |
  |---|---|---|
  | Link inline dentro de texto | `.touch-target` (pseudo-elemento) | El link conserva su caja; el ritmo tipográfico no se mueve |
  | Elemento que ya es bloque con padding propio | `min-h-11` | Ya ocupa su espacio; crecer no altera el layout |
  | Lista de links apilados | `min-h-11`, **nunca** `.touch-target` | Con paso entre líneas de ~28px, dos pseudo-elementos de 44px se traslapan. Aquí el crecimiento del elemento *es* lo que separa a los vecinos |

  ```css
  .touch-target {
    position: relative;
  }
  .touch-target::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
    transform: translate(-50%, -50%);
  }
  ```

  Al añadir un `.touch-target` hay que **verificar que su área no se traslape** con la de otro elemento interactivo: el pseudo-elemento es invisible y puede robar taps a un vecino sin que se note.
- **`prefers-reduced-motion`**: desactivar los `reveal` y el video en autoplay.
- **Lighthouse mobile** como métrica de cierre, no la de desktop.

---

## MobileMenu — especificación

No existe en el original, se construye desde cero. **No inventar lenguaje visual nuevo:** cada decisión sale de tokens y patrones que el sitio ya usa.

### Materiales disponibles (ya definidos)

| Elemento | Valor del sistema |
|---|---|
| Fondo | `archo-black` |
| Texto activo / hover | `archo-cream` |
| Texto en reposo | `archo-mist` |
| Acento | `archo-orange` |
| Textura de fondo | `blueprint-grid` o `blueprint-grid-fine` |
| Tipografía de links | `font-display` |
| Easing | `cubic-bezier(.22, 1, .36, 1)` — el mismo del `.reveal` |
| Tracking de nav | `tracking-[0.24em]` uppercase |

### Comportamiento

- **Overlay a pantalla completa**, no dropdown. El sitio es de tipografía grande y respiración amplia; un dropdown compacto contradice esa lógica.
- **Links en escala grande** (`text-3xl` / `text-4xl`) en `font-display`, no en el `text-[11px]` del nav desktop. En móvil hay espacio vertical y el sitio ya demuestra que apuesta por tipografía protagonista.
- **Entrada escalonada de los links** con el mismo easing del `reveal` y delays de 60-80ms entre uno y otro. Coherente con el resto del sitio.
- **Numeración `01`–`06`** al lado de cada link, en `archo-mist` y tamaño pequeño. El sitio ya numera todas sus secciones; el menú hereda ese código.
- **Indicador de ruta activa** con el mismo underline naranja del nav desktop, ya expandido.
- **Bloque de contacto al pie del overlay**: dirección, teléfono, email. En móvil el usuario está a un tap de llamar — que el teléfono sea `tel:` y el correo `mailto:`.
- **Ícono hamburguesa → cierre**: transición del path SVG, no un swap brusco de íconos.

### Requisitos técnicos

- `overflow: hidden` en `<body>` mientras está abierto
- Cierre con tecla `Escape`
- Focus trap dentro del overlay
- `aria-expanded` en el botón, `role="dialog"` + `aria-modal` en el overlay
- Cerrar automáticamente al navegar a otra ruta
- Respetar `prefers-reduced-motion`: sin escalonado, solo fade

---

## Contenido: replicar 1:1

**Todo el texto, nombres de proyectos, cifras y afirmaciones se copian tal cual del original.** No editar, no corregir, no reemplazar. Las modificaciones de contenido son una fase posterior y las define el cliente.

Esto incluye los nombres de proyectos (Torre Monolito, Museo Horizonte, etc.), las imágenes de Unsplash asociadas, y todo el copy de `/about` y `/process`.

Estructurar el contenido en archivos de datos separados (`src/data/projects.ts`, `src/data/services.ts`, etc.) en vez de hardcodearlo en los componentes. Así, cuando lleguen los cambios, se editan en un solo lugar sin tocar el markup.

---

## 🚩 Pendiente de captura

**Cifras de `/about`** — los contadores renderizan desde 0 en client-side, así que los valores finales no aparecen en el DOM capturado. Sacarlos del sitio en vivo: arquitectos e ingenieros, estados de operación, proyectos entregados, años de práctica.

---

## Bugs técnicos del original — no replicar

1. El `<link rel="preload">` usa `/Assets/` con A mayúscula mientras los `<img>` usan `/assets/`. Unificar en minúscula.
2. Los links de redes del footer apuntan a `#`. Dejarlos igual por ahora (es contenido), pero anotarlo para cuando el cliente pase las URLs reales.

---

## Orden de trabajo

1. Scaffold Vite + React + TS + Tailwind v4 + React Router
2. Tokens en `@theme` + las tres clases custom (valores de arriba, **no** copiar el CSS de referencia)
3. Hook `useReveal` con Intersection Observer + componente `Reveal`
4. `Header` + `MobileMenu` + `Footer` — **construidos y probados en viewport móvil primero**
5. Home, mobile-first: escribir el layout base para móvil y añadir `md:`/`lg:` después
6. Las 5 páginas restantes, mismo criterio
7. Optimización móvil: `srcset` de imágenes, carga diferida del video, áreas táctiles, `prefers-reduced-motion`
8. Lighthouse **mobile** + accesibilidad (navegación por teclado, focus visible, contraste)
9. Verificación en desktop

---

## Infraestructura

- Repo en la organización de GitHub de **Connect Marketing**, no en cuenta personal
- Proyecto de Vercel en cuenta de **equipo**, no personal
- README con accesos y pasos de despliegue documentados

Este punto es lo que evita repetir el problema que originó esta reconstrucción.

---

## DNS en GoDaddy (al desplegar)

Modificar únicamente:
- Registro `A` de `@`
- `CNAME` de `www`

**No tocar** los `MX` ni los `CNAME` de `_domainkey` (`secureserver1`, `secureserver2`) — son del correo `@archo.com.mx`. Borrarlos tumba el email del cliente.
