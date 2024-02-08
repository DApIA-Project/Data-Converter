import { jsonToOpenskyCsv } from './jsonToOpenskyCsv'

export function ndjsonToOpenskyCsv(
  ndjsonContentString: string,
  saveExtraField: boolean = false,
): string {
  ndjsonContentString=ndjsonContentString.replace(/\n\s*$/, '')
  const json: Record<string, string>[] = ndjsonContentString
    .split('\n')
    .map((line) => JSON.parse(line))

  return jsonToOpenskyCsv(JSON.stringify(json), saveExtraField)
}
