import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { defineField, defineType, getPublishedId } from 'sanity'

import { contador } from '../componentes/ContadorInput'
import { SlugInput } from '../componentes/SlugInput'
import { API_VERSION } from '../proyecto'
import { cuerpo } from './cuerpo'
import { FORMATO_SLUG, slugificar } from './slug'

/**
 * EL ARTÍCULO DEL BLOG
 *
 * Quien edita aquí son personas de marketing, no desarrolladores: cada campo
 * dice para qué sirve y qué pasa si se deja vacío. Los nombres internos
 * (`titulo`, `extracto`, …) son los que leerá el sitio en la fase 5; los
 * títulos visibles son los que ve el equipo.
 */

/** Límite de Google para la meta description antes de recortarla. */
const LIMITE_DESCRIPCION = 160
/** A partir de aquí Google suele recortar el título en los resultados. */
const LIMITE_TITULO_SEO = 60

export const post = defineType({
  name: 'post',
  title: 'Artículo del blog',
  type: 'document',
  icon: DocumentTextIcon,

  fieldsets: [
    {
      name: 'seo',
      title: 'Buscadores y redes sociales (opcional)',
      description:
        'Solo si quieres que en Google o al compartir el enlace aparezca algo distinto del título y el extracto. Si lo dejas vacío, se usan esos.',
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      description: 'El título del artículo, tal como se verá en la página y en el listado del blog.',
      type: 'string',
      validation: (Rule) => Rule.required().error('El artículo necesita un título.'),
    }),

    defineField({
      name: 'slug',
      title: 'URL del artículo',
      description:
        'La dirección del artículo: archo.com.mx/blog/esta-parte. Pulsa "Generar" para crearla a partir del título. Revísala antes de publicar: una vez publicado el artículo, ya no se puede cambiar.',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
        slugify: slugificar,
      },
      components: { input: SlugInput },
      validation: (Rule) => [
        Rule.required().error('Falta la URL. Pulsa "Generar" para crearla a partir del título.'),
        Rule.custom((valor) => {
          const actual = valor?.current
          if (!actual) return true
          return FORMATO_SLUG.test(actual)
            ? true
            : 'Usa solo minúsculas sin acentos, números y guiones (por ejemplo: diseno-de-cocinas). Pulsa "Generar" para corregirla sola.'
        }),
        /* Defensa además del campo bloqueado: si el artículo ya está
           publicado, la URL no puede diferir de la publicada. Un error de
           validación impide publicar. */
        Rule.custom(async (valor, context) => {
          const id = context.document?._id
          if (!id) return true
          const publicada = await context
            .getClient({ apiVersion: API_VERSION })
            .fetch<string | null>('*[_id == $id][0].slug.current', { id: getPublishedId(id) })
          return publicada && valor?.current !== publicada
            ? `Este artículo ya está publicado en /blog/${publicada}. Esa URL no se puede cambiar.`
            : true
        }),
      ],
    }),

    defineField({
      name: 'extracto',
      title: 'Extracto',
      description: `Un resumen de una o dos frases. Aparece en el listado del blog y, si no escribes otra en "Buscadores y redes sociales", es la descripción que muestra Google. Máximo ${LIMITE_DESCRIPCION} caracteres.`,
      type: 'text',
      rows: 3,
      components: { input: contador(LIMITE_DESCRIPCION) },
      validation: (Rule) => [
        Rule.required().error('El artículo necesita un extracto.'),
        Rule.max(LIMITE_DESCRIPCION).error(
          `Máximo ${LIMITE_DESCRIPCION} caracteres: Google recorta lo que pase de ahí.`,
        ),
      ],
    }),

    defineField({
      name: 'imagenPrincipal',
      title: 'Imagen principal',
      description:
        'La imagen de cabecera del artículo. También es la que aparece en el listado y al compartir el enlace en WhatsApp o LinkedIn. Después de subirla, marca con el punto de interés la zona que no debe recortarse.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          description:
            'Describe lo que se ve en la imagen, como se lo contarías a alguien que no puede verla. Lo leen los lectores de pantalla y Google. Ejemplo: "Fachada de concreto aparente de una casa en San Luis Potosí al atardecer".',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const conImagen = Boolean((context.parent as { asset?: unknown } | undefined)?.asset)
              return conImagen && !alt?.trim()
                ? 'Describe la imagen: el texto alternativo es obligatorio.'
                : true
            }),
        }),
      ],
      validation: (Rule) => Rule.required().error('El artículo necesita una imagen principal.'),
    }),

    cuerpo,

    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      description:
        'La fecha que aparece en el artículo. El listado del blog ordena por esta fecha, del más reciente al más antiguo.',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      options: { dateFormat: 'D [de] MMMM [de] YYYY', timeFormat: 'HH:mm' },
      validation: (Rule) => Rule.required().error('Falta la fecha de publicación.'),
    }),

    defineField({
      name: 'autor',
      title: 'Autor',
      description: 'Nombre de quien firma el artículo. Si lo dejas vacío, se firma como ARCHO.',
      type: 'string',
    }),

    defineField({
      name: 'seoTitulo',
      title: 'Título para Google',
      description: `Si lo dejas vacío, se usa el título del artículo. Conviene que no pase de ${LIMITE_TITULO_SEO} caracteres: Google recorta los títulos largos.`,
      type: 'string',
      fieldset: 'seo',
      components: { input: contador(LIMITE_TITULO_SEO) },
      validation: (Rule) =>
        Rule.max(LIMITE_TITULO_SEO).warning(
          `Pasa de ${LIMITE_TITULO_SEO} caracteres: Google probablemente lo recorte.`,
        ),
    }),

    defineField({
      name: 'seoDescripcion',
      title: 'Descripción para Google',
      description: `Si la dejas vacía, se usa el extracto. Máximo ${LIMITE_DESCRIPCION} caracteres.`,
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      components: { input: contador(LIMITE_DESCRIPCION) },
      validation: (Rule) =>
        Rule.max(LIMITE_DESCRIPCION).error(
          `Máximo ${LIMITE_DESCRIPCION} caracteres: Google recorta lo que pase de ahí.`,
        ),
    }),
  ],

  orderings: [
    {
      title: 'Fecha de publicación, más reciente primero',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Fecha de publicación, más antiguo primero',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],

  /* Lo que se ve en la lista de artículos: título, fecha e imagen. */
  preview: {
    select: { title: 'titulo', fecha: 'publishedAt', media: 'imagenPrincipal' },
    prepare({ title, fecha, media }) {
      return {
        title: title || 'Artículo sin título',
        subtitle: fecha
          ? new Date(fecha).toLocaleDateString('es-MX', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : 'Sin fecha de publicación',
        media,
      }
    },
  },
})
