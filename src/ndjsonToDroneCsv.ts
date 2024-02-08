import { jsonToDroneCsv } from './jsonToDroneCsv'

export function ndjsonToDroneCsv(
    ndjsonContentString: string,
    saveExtraField: boolean = false,
): string {
    ndjsonContentString=ndjsonContentString.replace(/\n\s*$/, '')
    const json: Record<string, string>[] = ndjsonContentString
        .split('\n')
        .map((line) => JSON.parse(line))

    return jsonToDroneCsv(JSON.stringify(json), saveExtraField)
}
