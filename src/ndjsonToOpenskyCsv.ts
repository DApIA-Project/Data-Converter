import { jsonToOpenskyCsv } from './jsonToOpenskyCsv'
import { OptionsConverter } from './types'
import { ndjsonToJson } from './ndjsonToJson'

export function ndjsonToOpenskyCsv(
  ndjsonContentString: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const json = ndjsonToJson(ndjsonContentString,options)
  return jsonToOpenskyCsv(json, {saveExtraField: options.saveExtraField, mustMerge: false})
}
