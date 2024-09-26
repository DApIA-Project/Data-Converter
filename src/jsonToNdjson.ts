import { JsonMessage, OptionsConverter } from './types'
import { mergeMessages } from './utils/mergeMessages'

export function jsonToNdjson(
  json: JsonMessage[],
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const messages = (options.mustMerge ? mergeMessages(json) : json)
  return messages.map((element) => JSON.stringify(element)).join('\n')
}