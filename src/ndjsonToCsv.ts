import { jsonToCsv } from './jsonToCsv'

export function ndjsonToCsv(
  ndjsonContentString: string,
  saveExtraField: boolean = false,
): string {
  ndjsonContentString=ndjsonContentString.replace(/\n\s*$/, '')
  const json: Record<string, string>[] = ndjsonContentString
    .split('\n')
    .map((line) => JSON.parse(line))

  return jsonToCsv(JSON.stringify(json), saveExtraField)
}
