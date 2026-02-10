'use server'

import config from '@payload-config'
import { importMap } from './importMap.js'
import { copyDataFromLocaleHandler } from '@payloadcms/ui/rsc'
import { buildFormStateHandler } from '@payloadcms/ui/utilities/buildFormState'
import { buildTableStateHandler } from '@payloadcms/ui/utilities/buildTableState'
import { schedulePublishHandler } from '@payloadcms/ui/utilities/schedulePublishHandler'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'

export const serverFunctionHandler = async (args) => {
  'use server'
  const { name: fnKey, args: fnArgs } = args

  const headers = await getHeaders()
  const payload = await getPayload({ config, importMap })

  const augmentedArgs = {
    ...fnArgs,
    importMap,
    req: { ...fnArgs?.req, payload, headers },
  }

  const serverFunctions = {
    'copy-data-from-locale': copyDataFromLocaleHandler,
    'form-state': buildFormStateHandler,
    'table-state': buildTableStateHandler,
    'schedule-publish': schedulePublishHandler,
  }

  const fn = serverFunctions[fnKey]
  if (!fn) {
    throw new Error(`Unknown Server Function: ${fnKey}`)
  }
  return fn(augmentedArgs)
}
