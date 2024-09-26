import { sbsToJson } from './sbsToJson'
import { OptionsConverter } from './types'

export function sbsToNdjson(
  sbsContent: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const array = sbsToJson(sbsContent, options)
  return array.map((element) => JSON.stringify(element)).join('\n')
}
