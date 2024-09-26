import { sbsToJson } from './sbsToJson'
import { OptionsConverter } from './types'
import { jsonToNdjson } from './jsonToNdjson'

export function sbsToNdjson(
  sbsContent: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const array = sbsToJson(sbsContent, options)
  return jsonToNdjson(array, options)
}
