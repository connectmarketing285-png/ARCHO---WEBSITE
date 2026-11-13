import { createContext, useContext, useEffect, useState } from 'react'

import type { Articulo, Bloque } from '@/data/blog'

/**
 * DE DÓNDE SALE EL CUERPO DE UN ARTÍCULO
 *
 * Tres casos, y en ninguno el cuerpo viaja en el bundle de JS:
 *
 *   1. Prerender (build). tools/prerenderizar.mjs lee el JSON del artículo y
 *      lo pasa por este contexto: el artículo completo queda en el HTML.
 *
 *   2. Primera carga en el navegador. El mismo JSON va embebido en la página
 *      (<script type="application/json" id="datos-articulo">); main.tsx lo lee
 *      y lo pasa por este contexto. Hidratar exige que el primer render del
 *      cliente coincida con el HTML, así que el cuerpo tiene que estar
 *      disponible YA, sin esperar a ninguna petición.
 *
 *   3. Navegación interna (del listado a un artículo, o de uno a otro). No hay
 *      HTML previo: se pide /datos/blog/<slug>.json. Mientras llega, la página
 *      ya pinta la cabecera con lo que trae el listado.
 */
export const ArticuloInicial = createContext<Articulo | null>(null)

export const ID_DATOS_ARTICULO = 'datos-articulo'

/** Ya pedidos en esta visita: volver a un artículo no repite la petición. */
const cache = new Map<string, Bloque[]>()

type Estado =
  | { slug: string; estado: 'listo'; cuerpo: Bloque[] }
  | { slug: string; estado: 'cargando' }
  | { slug: string; estado: 'error' }

function estadoInicial(slug: string, inicial: Articulo | null): Estado {
  if (inicial?.slug === slug) return { slug, estado: 'listo', cuerpo: inicial.cuerpo }
  const enCache = cache.get(slug)
  return enCache ? { slug, estado: 'listo', cuerpo: enCache } : { slug, estado: 'cargando' }
}

export function useCuerpo(slug: string): Estado {
  const inicial = useContext(ArticuloInicial)
  const [estado, setEstado] = useState<Estado>(() => estadoInicial(slug, inicial))

  /* Al pasar de un artículo a otro, el componente no se desmonta: el estado se
     recalcula durante el render si cambió el slug (patrón recomendado por
     React para estado derivado de props). */
  const actual = estado.slug === slug ? estado : estadoInicial(slug, inicial)
  if (actual !== estado) setEstado(actual)

  useEffect(() => {
    if (actual.estado !== 'cargando') return
    let vigente = true
    fetch(`/datos/blog/${slug}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<Articulo>) : Promise.reject(new Error(String(r.status)))))
      .then((datos) => {
        cache.set(slug, datos.cuerpo)
        if (vigente) setEstado({ slug, estado: 'listo', cuerpo: datos.cuerpo })
      })
      .catch(() => {
        if (vigente) setEstado({ slug, estado: 'error' })
      })
    return () => {
      vigente = false
    }
  }, [slug, actual.estado])

  return actual
}
