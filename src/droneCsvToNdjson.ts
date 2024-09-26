import { droneCsvToJson } from './droneCsvToJson'
import { OptionsConverter } from './types'
import { jsonToNdjson } from './jsonToNdjson'

export function droneCsvToNdjson(
    csvContent: string,
    options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
    const array = droneCsvToJson(csvContent, options)
    return jsonToNdjson(array, options)
}