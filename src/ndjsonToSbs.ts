import { jsonToSbs } from './jsonToSbs'

export function ndjsonToSbs(
  ndjsonContentString: string,
  saveExtraField: boolean = false,
): string {
  ndjsonContentString=ndjsonContentString.replace(/\n\s*$/, '')
  const json: Record<string, string>[] = ndjsonContentString
    .split('\n')
    .map((line) => JSON.parse(line))

  return jsonToSbs(JSON.stringify(json), saveExtraField)
}
