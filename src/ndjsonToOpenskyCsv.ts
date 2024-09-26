import { jsonToOpenskyCsv } from './jsonToOpenskyCsv'
import { OptionsConverter } from './types'

export function ndjsonToOpenskyCsv(
  ndjsonContentString: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  ndjsonContentString=ndjsonContentString.replace(/\n\s*$/, '')
  const json: Record<string, string>[] = ndjsonContentString
    .split('\n')
    .map((line) => JSON.parse(line))

  return jsonToOpenskyCsv(JSON.stringify(json), {saveExtraField: options.saveExtraField, mustMerge: false})
}
