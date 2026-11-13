import type { StructureResolver } from 'sanity/structure'

/**
 * El menú lateral del Studio: una sola entrada, los artículos, del más
 * reciente al más antiguo. Sin la lista genérica de "tipos de documento" que
 * Sanity pone por defecto, que a quien no programa no le dice nada.
 */
export const estructura: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Artículos del blog')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Artículos del blog')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),
    ])
