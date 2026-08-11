/**
 * Íconos como datos, no como JSX, para que los archivos de `src/data` sigan
 * siendo .ts puros. `Icon` los dibuja con stroke-width 1 y linecap square,
 * como en el original.
 */
export type IconShape =
  | { type: 'circle'; cx: number; cy: number; r: number }
  | { type: 'rect'; x: number; y: number; width: number; height: number; rx?: number }
  | { type: 'path'; d: string }

export const ICONS = {
  compass: [
    { type: 'circle', cx: 12, cy: 12, r: 9 },
    { type: 'path', d: 'M12 3v18M3 12h18' },
  ],
  volume: [{ type: 'path', d: 'M3 20h18M5 20l7-14 7 14M9 14h6' }],
  blueprint: [
    { type: 'rect', x: 3, y: 3, width: 18, height: 18 },
    { type: 'path', d: 'M3 9h18M9 3v18M15 9v12' },
  ],
  render: [
    { type: 'rect', x: 3, y: 5, width: 18, height: 14 },
    { type: 'path', d: 'M3 16l5-5 4 4 3-3 6 6' },
    { type: 'circle', cx: 16, cy: 9, r: 1.2 },
  ],
  headset: [
    { type: 'rect', x: 2, y: 8, width: 20, height: 9, rx: 2 },
    { type: 'circle', cx: 8, cy: 12.5, r: 2 },
    { type: 'circle', cx: 16, cy: 12.5, r: 2 },
  ],
} as const satisfies Record<string, readonly IconShape[]>

export type IconName = keyof typeof ICONS
