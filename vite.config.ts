import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { GA_MEASUREMENT_ID } from './src/data/analytics.ts'

/**
 * Rellena el snippet de GA4 de index.html con el ID de src/data/analytics.ts.
 * En `vite dev`, o con el ID vacío, quita el bloque: las visitas de desarrollo
 * no deben contar como tráfico real.
 */
function analyticsHtml(): Plugin {
  return {
    name: 'archo-analytics-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (ctx.server || !GA_MEASUREMENT_ID) {
          return html.replace(/<!-- ga:inicio -->[\s\S]*?<!-- ga:fin -->/, '')
        }
        return html.replaceAll('__GA_MEASUREMENT_ID__', GA_MEASUREMENT_ID)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), analyticsHtml()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
