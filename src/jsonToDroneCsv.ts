import { createObjectCsvStringifier } from 'csv-writer'
import {CsvDroneRow, CsvRow, JsonMessage} from './types'
import {
    getCsvDroneExtraFields,
    getCsvExtraFields,
    getDateFromSbsToDroneCsv,
    toCsvBoolean, toDroneCsvDate,
    toSbsDate
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
        if ((!message.date && (!message.dateMessageGenerated && !message.timeMessageGenerated) && !message.timestamp) || (!message.icao24 && !message.hexIdent)) {
            console.error(
                `Date or ICAO is missing for message ${JSON.stringify(message)}`,
            )
            continue
        }
        let date: string | number | boolean = ""
        if(message.dateMessageGenerated && message.timeMessageGenerated){
            date = getDateFromSbsToDroneCsv(message.dateMessageGenerated.toString(),message.timeMessageGenerated.toString())
        }else if(message.timestamp){
            date = toDroneCsvDate(message.timestamp.toString())
        }else if(message.date){
            date = message.date
        }
        const row: CsvDroneRow = {
            name: `${message.name || message.callsign || ''}`,
            icao24: `${message.icao24 || message.hexIdent || ''}`,
            date: `${message.date ? message.date : message.timestamp ? toDroneCsvDate(message.timestamp.toString()) : message.dateMessageGenerated && message.timeMessageGenerated ? getDateFromSbsToDroneCsv(message.dateMessageGenerated.toString(),message.timeMessageGenerated.toString()) : ''}`,
            fixName: `${message.fixName || ''}`,
            significantPoint: `${message.significantPoint || ''}`,
            "timeElapsed (s)": `${message["timeElapsed (s)"] || ''}`,
            "position.latitude (deg)": `${message["position.latitude (deg)"] || message.latitude || ''}`,
            "position.longitude (deg)": `${message["position.longitude (deg)"] || message.longitude || ''}`,
            "position.altitude (ft)": `${message["position.altitude (ft)"] || message.altitude || ''}`,
            "altitudeMax (ft)": `${message["altitudeMax (ft)"] || ''}`,
            "airSpeed (kt)": `${message["airSpeed (kt)"] || ''}`,
            "cas (kt)": `${message["cas (kt)"] || ''}`,
            mach: `${message.mach || ''}`,
            "heading (deg)": `${message["heading (deg)"] || message.track || message.heading || ''}`,
            "groundSpeed (kt)": `${message["groundSpeed (kt)"] || message.groundSpeed || ''}`,
            "distanceToNextWaypoint (NM)": `${message["distanceToNextWaypoint (NM)"] || ''}`,
            "flownDistance (NM)": `${message["flownDistance (NM)"] || ''}`,
            "wind.eastward (kt)": `${message["wind.eastward (kt)"] || ''}`,
            "wind.northward (kt)": `${message["wind.northward (kt)"] || ''}`,
            "wind.upward (ft/min)": `${message["wind.upward (ft/min)"] || ''}`,
            "route (deg)": `${message["route (deg)"] || ''}`,
            "mass (kg)": `${message["mass (kg)"] || ''}`,
            isOneWay: `${message.isOneWay || ''}`,
        }

        if (saveExtraField)
            row.extraField = JSON.stringify(getCsvDroneExtraFields(message))

        rows.push(row)
    }
    return rows
}
