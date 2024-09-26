import { jsonToSbs } from './jsonToSbs'
import { OptionsConverter } from './types'

export function ndjsonToSbs(
  ndjsonContentString: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  ndjsonContentString=ndjsonContentString.replace(/\n\s*$/, '')
  const json: Record<string, string>[] = ndjsonContentString
    .split('\n')
    .map((line) => JSON.parse(line))

  return jsonToSbs(JSON.stringify(json), {saveExtraField: options.saveExtraField, mustMerge: false})
}
