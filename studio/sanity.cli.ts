import { defineCliConfig } from 'sanity/cli'

import { DATASET, PROJECT_ID } from './proyecto'

export default defineCliConfig({
  api: { projectId: PROJECT_ID, dataset: DATASET },
  /*
   * Sin `studioHost`: la primera vez, `sanity deploy` pregunta el nombre y el
   * Studio queda en https://<nombre>.sanity.studio. Ver README.md.
   */
})
