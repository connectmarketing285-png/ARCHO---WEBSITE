import { Stack, Text } from '@sanity/ui'
import type { StringInputProps } from 'sanity'

/**
 * El campo de siempre, con un contador debajo: "84 / 160".
 *
 * La validación de Sanity ya avisa al pasarse del límite, pero solo cuando ya
 * se pasó. Con el contador se ve el margen mientras se escribe, que es lo que
 * necesita quien redacta un extracto o una meta description.
 *
 * Se pone en naranja al acercarse (90%) y en rojo al pasarse.
 */
export function contador(limite: number) {
  return function ContadorInput(props: StringInputProps) {
    const largo = props.value?.length ?? 0
    const tono = largo > limite ? 'critical' : largo >= limite * 0.9 ? 'caution' : 'default'

    return (
      <Stack gap={2}>
        {props.renderDefault(props)}
        <Text size={1} muted={tono === 'default'} style={{ textAlign: 'right' }}>
          <span
            style={{
              color:
                tono === 'critical'
                  ? 'var(--card-badge-critical-fg-color)'
                  : tono === 'caution'
                    ? 'var(--card-badge-caution-fg-color)'
                    : undefined,
            }}
          >
            {largo} / {limite}
          </span>
        </Text>
      </Stack>
    )
  }
}
