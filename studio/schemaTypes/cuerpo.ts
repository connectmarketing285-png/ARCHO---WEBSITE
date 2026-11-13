import { defineArrayMember, defineField } from 'sanity'

/**
 * EL CUERPO DEL ARTÍCULO  ·  Portable Text con lo justo
 *
 * Solo lo que de verdad se usa en un artículo: párrafo, H2, H3, negrita,
 * cursiva, listas, enlaces e imagen. Un editor con veinte opciones termina en
 * artículos con formatos distintos entre sí, y cada formato es algo que el
 * sitio tiene que saber pintar.
 *
 * SIN H1. El H1 de la página lo pone el sitio con el título del artículo; un
 * segundo H1 en el cuerpo rompe la jerarquía de encabezados (accesibilidad y
 * SEO). Al declarar `styles` explícitamente, el editor solo ofrece estos tres;
 * y si alguien pega texto con un H1 desde Google Docs o Word, el editor lo
 * convierte en párrafo. La validación de abajo cubre el último caso: contenido
 * que llegue por la API, sin pasar por el editor.
 *
 * Tampoco hay cita, código, subrayado ni tachado. Si un día hacen falta, se
 * añaden aquí y en el componente que lo pinta en el sitio, a la vez.
 */

const ESTILOS = [
  { title: 'Párrafo', value: 'normal' },
  { title: 'Encabezado de sección (H2)', value: 'h2' },
  { title: 'Subencabezado (H3)', value: 'h3' },
]
const ESTILOS_PERMITIDOS = new Set(ESTILOS.map((e) => e.value))

export const cuerpo = defineField({
  name: 'cuerpo',
  title: 'Cuerpo del artículo',
  description:
    'El texto del artículo. Usa H2 para las secciones principales y H3 para dividir una sección. El título del artículo ya es el encabezado principal de la página: no lo repitas aquí.',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: ESTILOS,
      lists: [
        { title: 'Lista con viñetas', value: 'bullet' },
        { title: 'Lista numerada', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Negrita', value: 'strong' },
          { title: 'Cursiva', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Enlace',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'Dirección',
                description:
                  'Para otra página de ARCHO basta la ruta, por ejemplo /contact. Para otro sitio, la dirección completa con https://.',
                validation: (Rule) =>
                  Rule.required()
                    .uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true })
                    .error('Escribe una dirección válida: /contact, https://…, mailto: o tel:'),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      name: 'imagen',
      title: 'Imagen',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          description:
            'Describe lo que se ve en la imagen, como se lo contarías a alguien que no puede verla. Lo leen los lectores de pantalla y Google.',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const conImagen = Boolean((context.parent as { asset?: unknown } | undefined)?.asset)
              return conImagen && !alt?.trim() ? 'Describe la imagen: el texto alternativo es obligatorio.' : true
            }),
        }),
      ],
    }),
  ],
  validation: (Rule) =>
    Rule.custom((bloques) => {
      const ajeno = (bloques as { _type: string; style?: string }[] | undefined)?.find(
        (b) => b._type === 'block' && b.style && !ESTILOS_PERMITIDOS.has(b.style),
      )
      return ajeno
        ? `El cuerpo tiene un formato que el sitio no usa ("${ajeno.style}"). Cámbialo por Párrafo, H2 o H3.`
        : true
    }),
})
