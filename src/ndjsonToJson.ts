import { JsonMessage, OptionsConverter } from './types'
import { mergeMessages } from './utils/mergeMessages'

export function ndjsonToJson(
  ndjsonContentString: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  ndjsonContentString=ndjsonContentString.replace(/\n\s*$/, '')
  const json: Record<string, string>[] = ndjsonContentString
    .split('\n')
    .map((line) => JSON.parse(line))
  return (options.mustMerge ? JSON.stringify(mergeMessages(json as JsonMessage[])) : JSON.stringify(json))
}
