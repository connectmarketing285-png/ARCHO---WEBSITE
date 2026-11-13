import { esESLocale } from '@sanity/locale-es-es'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { estructura } from './estructura'
import { DATASET, PROJECT_ID } from './proyecto'
import { schemaTypes } from './schemaTypes'

/**
 * EL STUDIO DEL BLOG DE ARCHO
 *
 * Proyecto aparte del sitio: vive en studio/, con su propio package.json, y se
 * despliega con `npm run deploy` a *.sanity.studio. El sitio no lo importa ni
 * lo construye; en la fase 5 leerá el contenido publicado desde la API.
 *
 * Pensado para quien escribe, no para quien programa: interfaz en español,
 * un solo tipo de contenido y sin herramientas de desarrollo (Vision, el
 * explorador de consultas, no se instala).
 */
export default defineConfig({
  name: 'archo-blog',
  title: 'ARCHO · Blog',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [structureTool({ structure: estructura }), esESLocale()],

  schema: {
    types: schemaTypes,
  },

  document: {
    /* En el botón "Crear" solo aparece el artículo. */
    newDocumentOptions: (anteriores) => anteriores.filter((o) => o.templateId === 'post'),
  },
})
