import { sbsToJson } from './sbsToJson'

export function sbsToNdjson(
  sbsContent: string,
  saveExtraField: boolean = false,
): string {
  const array = sbsToJson(sbsContent, saveExtraField)
  return array.map((element) => JSON.stringify(element)).join('\n')
}
