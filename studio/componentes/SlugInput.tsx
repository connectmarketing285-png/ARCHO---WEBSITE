import { Card, Stack, Text } from '@sanity/ui'
import { getPublishedId, useEditState, useFormValue, type SlugInputProps } from 'sanity'

/**
 * El campo "URL del artículo", bloqueado en cuanto el artículo se publica.
 *
 * Por qué: la URL publicada la indexa Google y la comparte la gente. Si
 * cambia, todos esos enlaces terminan en un 404, y el sitio no puede generar
 * redirecciones automáticas (vercel.json es estático).
 *
 * Mientras el artículo es un borrador que nunca se publicó, el campo se edita
 * normal. Después queda de solo lectura y se explica por qué. Además, el
 * esquema valida en `post.ts` que la URL no cambie respecto a la publicada,
 * por si alguien llega a editarla por otra vía (la API, un script).
 */
export function SlugInput(props: SlugInputProps) {
  const id = useFormValue(['_id']) as string | undefined
  const { published } = useEditState(id ? getPublishedId(id) : '', 'post')
  const urlPublicada = (published?.slug as { current?: string } | undefined)?.current

  if (!urlPublicada) return props.renderDefault(props)

  return (
    <Stack gap={3}>
      {props.renderDefault({ ...props, readOnly: true })}
      <Card tone="caution" padding={3} radius={2} border>
        <Text size={1}>
          Este artículo ya está publicado en <strong>/blog/{urlPublicada}</strong>, y esa dirección
          ya puede estar en Google o compartida. Por eso no se puede cambiar: si cambiara, esos
          enlaces llevarían a una página de error.
        </Text>
      </Card>
    </Stack>
  )
}
