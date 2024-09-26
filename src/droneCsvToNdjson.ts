import { droneCsvToJson } from './droneCsvToJson'
import { OptionsConverter } from './types'

export function droneCsvToNdjson(
    csvContent: string,
    options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
    const array = droneCsvToJson(csvContent, options)
    return array.map((element) => JSON.stringify(element)).join('\n')
}