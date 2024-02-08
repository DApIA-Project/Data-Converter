import { createObjectCsvStringifier } from 'csv-writer'
import {CsvDroneRow, JsonMessage} from './types'
import {
    getCsvDroneExtraFields,
} from './utils/utils'

export function jsonToDroneCsv(
    jsonContentString: string,
    saveExtraField: boolean = false,
): string {
    const json = JSON.parse(jsonContentString)
    if (!Array.isArray(json)) throw new Error('JSON data must be an array')

    const messages = json as JsonMessage[]
    const droneCsvData = createDroneCSVData(messages, saveExtraField)

    if (
        droneCsvData.length === 0 ||
        droneCsvData.every((item) =>
            Object.values(item).every((value) => value === '' || value === null),
        )
    ) {
        return '' // Retournez seulement l'en-tête
    } else {
        const csvStringifier = createObjectCsvStringifier({
            header: Object.keys(droneCsvData[0]).map((header) => ({
                id: header,
                title: header,
            })),
            fieldDelimiter : ';'
        })

        return (
            csvStringifier.getHeaderString() +
            csvStringifier
                .stringifyRecords(droneCsvData)
                .replace(/""/g, '"')
                .replace(/"{/g, "'{")
                .replace(/}"/g, "}'")
        ).trim()
    }
}

function createDroneCSVData(
    messages: JsonMessage[],
    saveExtraField: boolean,
): CsvDroneRow[] {
    const rows: CsvDroneRow[] = []

    for (const message of messages) {
        if (!message.date  || !message.icao24 ) {
            console.error(
                `Date or ICAO is missing for message ${JSON.stringify(message)}`,
            )
            continue
        }


        const row: CsvDroneRow = {
            name: `${message.name || ''}`,
            icao24: `${message.icao24 || ''}`,
            date: `${message.date || ''}`,
            fixName: `${message.fixName || ''}`,
            significantPoint: `${message.significantPoint || ''}`,
            timeElapsed : `${message.timeElapsed || ''}`,
            "position.latitude": `${message["position.latitude"] || ''}`,
            "position.longitude": `${message["position.longitude"] || ''}`,
            "position.altitude": `${message["position.altitude"] || ''}`,
            altitudeMax: `${message.altitudeMax || ''}`,
            airSpeed: `${message.airSpeed || ''}`,
            cas: `${message.cas || ''}`,
            mach: `${message.mach || ''}`,
            heading: `${message.heading || ''}`,
            groundSpeed: `${message.groundSpeed || ''}`,
            distanceToNextWaypoint: `${message.distanceToNextWaypoint || ''}`,
            flownDistance: `${message.flownDistance || ''}`,
            "wind.eastward": `${message["wind.eastward"] || ''}`,
            "wind.northward": `${message["wind.northward"] || ''}`,
            "wind.upward": `${message["wind.upward"] || ''}`,
            route: `${message.route || ''}`,
            mass: `${message.mass || ''}`,
            isOneWay: `${message.isOneWay || ''}`,
        }

        if (saveExtraField)
            row.extraField = JSON.stringify(getCsvDroneExtraFields(message))

        rows.push(row)
    }
    return rows
}
