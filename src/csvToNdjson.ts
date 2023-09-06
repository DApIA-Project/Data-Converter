import { csvToJson } from './csvToJson'

export function csvToNdjson(
  csvContent: string,
  saveExtraField: boolean = false,
): string {
  const array = csvToJson(csvContent, saveExtraField)
  return array.map((element) => JSON.stringify(element)).join('\n')
}
