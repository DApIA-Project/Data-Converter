import {ExtraFieldsCSV, ExtraFieldsSBS} from "./types";
import {parse} from "csv-parse/sync"

export function getTimestampToDate(timestamp: string): string {
    const date = new Date(parseInt(timestamp) * 1000)
    if (date.toString() === "Invalid Date") {
        return "Error content file"
    }
    const year = date.getUTCFullYear()
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = date.getUTCDate().toString().padStart(2, '0');
    const formattedDate = "" + year + "/" + month + "/" + day
    return formattedDate
}

export function getTimestampToTime(timestamp: string): string {
    const date = new Date(parseInt(timestamp) * 1000)
    if (date.toString() === "Invalid Date") {
        return "Error content file"
    }
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    const formattedTime = "" + hours + ":" + minutes + ":" + seconds + "." + milliseconds
    return formattedTime
}

export function convertCSVtoSBS(csvContent: string): string {

    const records = parse(csvContent, {columns: true, quote : "'" })


    const sbsRows: string[] = [];
    let idForPlane: Map<string, number> = new Map<string, number>();
    let cptID = 1;
    let indexExtraField : number = 22;
    let sbsValues: string[] = [];
    for (const record of records) {
            let objectJson: ExtraFieldsSBS = {
                messageType: "",
                transmissionType: "",
                sessionID: "",
                aircraftID: "",
                flightID: "",
                emergency: "",
            }
            if(record.extraField !== undefined){
                record.extraField = record.extraField.replace(/([a-zA-Z0-9_]+)(\s*)/g, '"$1"$2');
                objectJson = JSON.parse(record.extraField)
                if (Object.keys(objectJson).length === 0) {
                    return "Error content file"
                }
            }

            /** Valeurs par défaut si pas champ extra**/
            if (record.extraField === undefined) {
                sbsValues[0] = "MSG"
                sbsValues[1] = "3"
                sbsValues[2] = "1"
                if (!idForPlane.has(record.icao24)) {
                    sbsValues[3] = cptID.toString()
                    sbsValues[5] = cptID.toString()
                    idForPlane.set(record.icao24, cptID)
                    cptID++
                } else {
                    sbsValues[3] = (idForPlane.get(record.icao24))!.toString()
                    sbsValues[5] = (idForPlane.get(record.icao24))!.toString()
                }
                sbsValues[19] = "0"
            }

            let extraFields: ExtraFieldsCSV = {
                altitude: "",
                last_position: "",
                lastcontact: "",
                hour: ""
            }

            sbsValues[6] = getTimestampToDate(record.timestamp)
            if (sbsValues[6] === "Error content file") {
                return "Error content file"
            }
            sbsValues[7] = getTimestampToTime(record.timestamp)
            sbsValues[8] = getTimestampToDate(record.timestamp)
            sbsValues[9] = getTimestampToTime(record.timestamp)

            sbsValues[4] = record.icao24
            sbsValues[14] = record.latitude
            sbsValues[15] = record.longitude
            sbsValues[12] = record.groundspeed

            if(record.heading !== undefined){
                sbsValues[13] = record.heading
            }
            if(record.track !== undefined){
                sbsValues[13] = record.track
            }
            sbsValues[16] = record.vertical_rate
            sbsValues[10] = record.callsign
            if (record.onground === "True") {
                sbsValues[21] = "1"
            } else {
                sbsValues[21] = "0"
            }
            if (record.alert === "True") {
                sbsValues[18] = "1"
            } else {
                sbsValues[18] = "0"
            }
            if (record.spi === "True") {
                sbsValues[20] = "1"
            } else {
                sbsValues[20] = "0"
            }
            if (record.squawk === "NaN" || record.squawk === "") {
                sbsValues[17] = ""
            } else {
                sbsValues[17] = record.squawk
            }
            extraFields.altitude = record.altitude
            sbsValues[11] = ((parseFloat(record.altitude) + parseFloat(record.geoaltitude)) / 2).toString()
            if(sbsValues[11]=== "NaN"){
                sbsValues[11] = ""
            }
            if(record.lastposupdate !== undefined){
                extraFields.last_position = record.lastposupdate
            }

            if(record.last_position !== undefined){
                extraFields.last_position = record.last_position
            }

            extraFields.lastcontact = record.lastcontact
            extraFields.hour = record.hour

            if(record.extraField !== undefined){
                sbsValues[0] = objectJson.messageType
                sbsValues[1] = objectJson.transmissionType
                sbsValues[2] = objectJson.sessionID
                sbsValues[3] = objectJson.aircraftID
                sbsValues[5] = objectJson.flightID
                sbsValues[19] = objectJson.emergency
                if(objectJson.haveLabel !== undefined && objectJson.label !== undefined){
                    sbsValues[22] = objectJson.haveLabel
                    sbsValues[23] = objectJson.label
                    indexExtraField = 24
                }

            }

            sbsValues[indexExtraField] = JSON.stringify(extraFields)


            let oneRow: string = sbsValues.join(',')
            sbsRows.push(oneRow);



    }

    let sbsContent: string = sbsRows.join('\n')
    return sbsContent


}
