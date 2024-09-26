import { jsonToSbs } from './jsonToSbs'
import { OptionsConverter } from './types'
import { ndjsonToJson } from './ndjsonToJson'

export function ndjsonToSbs(
  ndjsonContentString: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const json = ndjsonToJson(ndjsonContentString,options)

  return jsonToSbs(json, {saveExtraField: options.saveExtraField, mustMerge: false})
}
