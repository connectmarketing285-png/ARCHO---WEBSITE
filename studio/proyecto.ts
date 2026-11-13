/**
 * El proyecto de Sanity del blog. Lo leen sanity.config.ts (el Studio) y
 * sanity.cli.ts (los comandos `sanity deploy`, `sanity dev`, …).
 *
 * No son secretos: el dataset es público y el sitio lo lee sin token. Lo que
 * protege la escritura es la cuenta de cada editor, no estos valores.
 */
export const PROJECT_ID = '527gs4h8'
export const DATASET = 'production'

/** Versión de la API para las consultas que hace el propio Studio (validaciones). */
export const API_VERSION = '2025-02-19'
