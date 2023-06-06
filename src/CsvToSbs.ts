import {ExtraFieldsCSV, ExtraFieldsSBS} from "./types";

export function getTimestampToDate(timestamp: string): string {
    const date = new Date(parseInt(timestamp) * 1000)
    if(date.toString() === "Invalid Date"){
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
    if(date.toString() === "Invalid Date"){
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
    const csvRows: string[] = csvContent.split('\n');
    const columnNames: string[] = csvRows[0].split(',');
    csvRows.shift();

    const sbsRows: string[] = [];
    let idForPlane: Map<string, number> = new Map<string, number>();
    let cptID = 1;
    let csvValues: string[] = [];
    let sbsValues: string[] = [];
    for (const csvRow of csvRows) {
        if (!(!csvRow || csvRow.trim().length === 0)) {
            const jsonIndexStart = csvRow.indexOf('{');
            let objectJson: ExtraFieldsSBS = {
                messageType: "",
                transmissionType: "",
                sessionID: "",
                aircraftID: "",
                flightID: "",
                emergency: ""
            }
            let beforeJson: string = ""
            if (jsonIndexStart != -1) {
                beforeJson = csvRow.substring(0, jsonIndexStart)
                objectJson = JSON.parse(csvRow.substring(jsonIndexStart))
                if (Object.keys(objectJson).length === 0) {
                    return "Error content file"
                }
                csvValues = beforeJson.split(',');
            } else {
                csvValues = csvRow.split(',');
            }


            /** Valeurs par défaut si pas champ extra**/
            if (csvValues[17] === undefined) {
                sbsValues[0] = "MSG"
                sbsValues[1] = "3"
                sbsValues[2] = "1"
                if (!idForPlane.has(csvValues[1])) {
                    sbsValues[3] = cptID.toString()
                    sbsValues[5] = cptID.toString()
                    idForPlane.set(csvValues[1], cptID)
                    cptID++
                } else {
                    sbsValues[3] = (idForPlane.get(csvValues[1]))!.toString()
                    sbsValues[5] = (idForPlane.get(csvValues[1]))!.toString()
                }
                sbsValues[19] = "0"
            }

            let extraFields: ExtraFieldsCSV = {
                baroaltitude: "",
                lastposupdate: "",
                lastcontact: "",
                hour: ""
            }
            /** Champs csv **/
            for (const champ of columnNames) {
                switch (champ) {
                    case "time":

                        sbsValues[6] = getTimestampToDate(csvValues[0])
                        if (sbsValues[6] === "Error content file") {
                            return "Error content file"
                        }
                        sbsValues[7] = getTimestampToTime(csvValues[0])
                        sbsValues[8] = getTimestampToDate(csvValues[0])
                        sbsValues[9] = getTimestampToTime(csvValues[0])


                        break
                    case "icao24":
                        sbsValues[4] = csvValues[1]
                        break
                    case "lat":
                        sbsValues[14] = csvValues[2]
                        break
                    case "lon":
                        sbsValues[15] = csvValues[3]
                        break
                    case "velocity":
                        sbsValues[12] = csvValues[4]
                        break
                    case "heading":
                        sbsValues[13] = csvValues[5]
                        break
                    case "track":
                        sbsValues[13] = csvValues[5]
                        break
                    case "vertrate":
                        sbsValues[16] = csvValues[6]
                        break
                    case "callsign":
                        sbsValues[10] = csvValues[7]
                        break
                    case "onground":
                        if (csvValues[8] === "True") {
                            sbsValues[21] = "1"
                        } else {
                            sbsValues[21] = "0"
                        }
                        break
                    case "alert":
                        if (csvValues[9] === "True") {
                            sbsValues[18] = "1"
                        } else {
                            sbsValues[18] = "0"
                        }
                        break
                    case "spi":
                        if (csvValues[10] === "True") {
                            sbsValues[20] = "1"
                        } else {
                            sbsValues[20] = "0"
                        }
                        break
                    case "squawk":
                        if (csvValues[11] === "NaN" || csvValues[11] === "") {
                            sbsValues[17] = ""
                        } else {
                            sbsValues[17] = csvValues[11]
                        }
                        break
                    case "baroaltitude":
                        extraFields.baroaltitude = csvValues[12]
                        break
                    case "geoaltitude":
                        sbsValues[11] = csvValues[13]
                        break
                    case "lastposupdate":
                        extraFields.lastposupdate = csvValues[14]
                        break
                    case "lastcontact":
                        extraFields.lastcontact = csvValues[15]
                        break
                    case "hour":
                        extraFields.hour = csvValues[16]
                        break
                    case "extraField" :

                        sbsValues[0] = objectJson.messageType
                        sbsValues[1] = objectJson.transmissionType
                        sbsValues[2] = objectJson.sessionID
                        sbsValues[3] = objectJson.aircraftID
                        sbsValues[5] = objectJson.flightID
                        sbsValues[19] = objectJson.emergency

                }

            }
            console.log(extraFields)
            sbsValues[22] = JSON.stringify(extraFields)
            console.log(sbsValues[22])

            let oneRow: string = sbsValues.join(',')
            sbsRows.push(oneRow);
        }




    }

    let sbsContent: string = sbsRows.join('\n')
    return sbsContent


}
