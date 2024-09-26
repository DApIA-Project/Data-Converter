import { openskyCsvToJson } from './openskyCsvToJson'
import { OptionsConverter } from './types'
import { jsonToNdjson } from './jsonToNdjson'

export function openskyCsvToNdjson(
  openskyCsvContent: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const array = openskyCsvToJson(openskyCsvContent, options)
  return jsonToNdjson(array, options)
}
