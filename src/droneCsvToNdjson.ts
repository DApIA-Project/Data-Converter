import { droneCsvToJson } from './droneCsvToJson'

export function droneCsvToNdjson(
    csvContent: string,
    saveExtraField: boolean = false,
): string {
    const array = droneCsvToJson(csvContent, saveExtraField)
    return array.map((element) => JSON.stringify(element)).join('\n')
}