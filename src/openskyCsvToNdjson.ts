import { openskyCsvToJson } from './openskyCsvToJson'
import { OptionsConverter } from './types'

export function openskyCsvToNdjson(
  openskyCsvContent: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const array = openskyCsvToJson(openskyCsvContent, options)
  return array.map((element) => JSON.stringify(element)).join('\n')
}
