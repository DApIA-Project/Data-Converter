import { jsonToDroneCsv } from './jsonToDroneCsv'
import { OptionsConverter } from './types'
import { ndjsonToJson } from './ndjsonToJson'

export function ndjsonToDroneCsv(
    ndjsonContentString: string,
    options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
    const json = ndjsonToJson(ndjsonContentString,options)
    return jsonToDroneCsv(json, { saveExtraField : options.saveExtraField, mustMerge: false })
}
