import { openskyCsvToJson } from './openskyCsvToJson'

export function openskyCsvToNdjson(
  openskyCsvContent: string,
  saveExtraField: boolean = false,
): string {
  const array = openskyCsvToJson(openskyCsvContent, saveExtraField)
  return array.map((element) => JSON.stringify(element)).join('\n')
}
