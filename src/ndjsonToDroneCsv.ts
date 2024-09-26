import { jsonToDroneCsv } from './jsonToDroneCsv'
import { OptionsConverter } from './types'

export function ndjsonToDroneCsv(
    ndjsonContentString: string,
    options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
    ndjsonContentString=ndjsonContentString.replace(/\n\s*$/, '')
    const json: Record<string, string>[] = ndjsonContentString
        .split('\n')
        .map((line) => JSON.parse(line))

    return jsonToDroneCsv(JSON.stringify(json), { saveExtraField : options.saveExtraField, mustMerge: false })
}
