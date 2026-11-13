import { defineCliConfig } from 'sanity/cli'

import { DATASET, PROJECT_ID } from './proyecto'

export default defineCliConfig({
  api: { projectId: PROJECT_ID, dataset: DATASET },

  /*
   * El Studio desplegado: https://archo-blog.sanity.studio
   *
   * `appId` lo generó el primer `sanity deploy` e identifica ese despliegue,
   * con su host incluido, así que los siguientes ya no preguntan nada. No va
   * `studioHost`: en Sanity 6 está obsoleto y lo sustituye `appId`.
   */
  deployment: {
    appId: 'ed7h0zamyns91f31tr3wt45c',
  },
})
