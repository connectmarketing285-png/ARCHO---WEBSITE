import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import ImagenSanity from '@/components/blog/ImagenSanity'
import type { Bloque, BloqueTexto, Enlace, Span } from '@/data/blog'

/**
 * EL CUERPO DE UN ARTÍCULO  ·  Portable Text → HTML
 *
 * Sin @portabletext/react: el Studio solo permite párrafo, H2, H3, negrita,
 * cursiva, listas, enlaces e imagen (studio/schemaTypes/cuerpo.ts), y pintar
 * eso es este archivo. Lo que no está aquí no se pinta: si algún día el
 * Studio admite un formato nuevo, se añade en los dos sitios a la vez.
 *
 * Los estilos tipográficos viven en `.prosa` (index.css).
 */

type Item = { bloque: BloqueTexto; hijos: Lista[] }
type Lista = { _type: 'lista'; _key: string; tipo: 'bullet' | 'number'; nivel: number; items: Item[] }
type Nodo = Bloque | Lista

/**
 * En Portable Text cada elemento de lista es un bloque suelto con `listItem` y
 * `level`. Aquí se agrupan los consecutivos en <ul>/<ol>, anidando por nivel.
 */
function agrupar(bloques: readonly Bloque[]): Nodo[] {
  const salida: Nodo[] = []
  let pila: Lista[] = []

  for (const b of bloques) {
    if (b._type !== 'block' || !b.listItem) {
      pila = []
      salida.push(b)
      continue
    }

    const nivel = b.level ?? 1
    while (pila.length) {
      const tope = pila[pila.length - 1]
      if (tope.nivel > nivel || (tope.nivel === nivel && tope.tipo !== b.listItem)) pila.pop()
      else break
    }

    let tope = pila[pila.length - 1]
    if (!tope || tope.nivel < nivel) {
      const nueva: Lista = { _type: 'lista', _key: b._key, tipo: b.listItem, nivel, items: [] }
      const padre = tope?.items[tope.items.length - 1]
      if (padre) padre.hijos.push(nueva)
      else salida.push(nueva)
      pila.push(nueva)
      tope = nueva
    }
    tope.items.push({ bloque: b, hijos: [] })
  }

  return salida
}

/** Un salto de línea suave (Mayús+Intro en el editor) llega como "\n". */
function conSaltos(texto: string) {
  const partes = texto.split('\n')
  return partes.map((parte, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {parte}
    </Fragment>
  ))
}

function EnlaceTexto({ href, children }: { href: string; children: ReactNode }) {
  /* Una ruta del propio sitio navega sin recargar, como el resto del menú. */
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}

function Texto({ span, enlaces }: { span: Span; enlaces: Map<string, Enlace> }) {
  let nodo: ReactNode = conSaltos(span.text)
  /* Las marcas se aplican de dentro hacia fuera; el orden no cambia el
     resultado visible. Las desconocidas se ignoran. */
  for (const marca of span.marks ?? []) {
    if (marca === 'strong') nodo = <strong>{nodo}</strong>
    else if (marca === 'em') nodo = <em>{nodo}</em>
    else {
      const enlace = enlaces.get(marca)
      if (enlace?.href) nodo = <EnlaceTexto href={enlace.href}>{nodo}</EnlaceTexto>
    }
  }
  return <>{nodo}</>
}

function Linea({ bloque }: { bloque: BloqueTexto }) {
  const enlaces = new Map((bloque.markDefs ?? []).map((m) => [m._key, m]))
  return (
    <>
      {bloque.children.map((span) => (
        <Texto key={span._key} span={span} enlaces={enlaces} />
      ))}
    </>
  )
}

const vacio = (b: BloqueTexto) => b.children.every((s) => !s.text.trim())

function ListaHtml({ lista }: { lista: Lista }) {
  const Etiqueta = lista.tipo === 'number' ? 'ol' : 'ul'
  return (
    <Etiqueta>
      {lista.items.map(({ bloque, hijos }) => (
        <li key={bloque._key}>
          <Linea bloque={bloque} />
          {hijos.map((h) => (
            <ListaHtml key={h._key} lista={h} />
          ))}
        </li>
      ))}
    </Etiqueta>
  )
}

function NodoHtml({ nodo }: { nodo: Nodo }) {
  if (nodo._type === 'lista') return <ListaHtml lista={nodo} />

  if (nodo._type === 'imagen') {
    return (
      <figure>
        <ImagenSanity imagen={nodo} sizes="(min-width: 48rem) 680px, calc(100vw - 3rem)" limitarAlOriginal />
      </figure>
    )
  }

  /* Párrafos vacíos (un Intro de más en el editor) no se pintan: en HTML
     serían un hueco sin significado. */
  if (vacio(nodo)) return null
  if (nodo.style === 'h2') return <h2><Linea bloque={nodo} /></h2>
  if (nodo.style === 'h3') return <h3><Linea bloque={nodo} /></h3>
  return <p><Linea bloque={nodo} /></p>
}

export default function PortableTexto({ bloques }: { bloques: readonly Bloque[] }) {
  return (
    <>
      {agrupar(bloques).map((nodo) => (
        <NodoHtml key={nodo._key} nodo={nodo} />
      ))}
    </>
  )
}
