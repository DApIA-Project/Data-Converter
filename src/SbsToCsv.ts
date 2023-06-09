import {ExtraFieldsCSV, ExtraFieldsSBS} from "./types";

export function getDateToTimestamp(date : string, time : string) : string {

    const timestamp = Date.parse(date + ',' + time + ' GMT')
    if(isNaN(timestamp)){
        return "Error content file"
    }
    const timestampInSeconds : number = Math.floor(timestamp / 1000);
    return timestampInSeconds.toString()

}
export function convertSBStoCSV(sbsContent: string, saveExtraField : boolean): string {
    const sbsRows: string[] = sbsContent.split('\n');
    const columnNames: string[] = [
        'messageType',
        'transmissionType',
        'sessionID',
        'aircraftID',
        'icao',
        'flightID',
        'dateMessageGenerated',
        'timeMessageGenerated',
        'DateMessageLogged',
        'timeMessageLogged',
        'callsign',
        'altitude',
        'groundSpeed',
        'track',
        'latitude',
        'longitude',
        'verticalRate',
        'squawk',
        'alert',
        'emergency',
        'spi',
        'isOnGround',
        'extraField'
    ];


    const csvRows: string[] = [];
    let enteteCSV = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour";
    if(saveExtraField){
        enteteCSV = enteteCSV + ",extraField"
    }
    csvRows.push(enteteCSV);
    let sbsValues: string[] = [];
    let csvValues: string[] = [];
    for (const sbsRow of sbsRows) {
        if (!(!sbsRow || sbsRow.trim().length === 0)) {
            const jsonIndexStart = sbsRow.indexOf('{');
            let objectJson: ExtraFieldsCSV = {baroaltitude: "", lastposupdate: "", lastcontact: "", hour: ""}
            let beforeJson: string = ""
            if (jsonIndexStart != -1) {
                beforeJson = sbsRow.substring(0, jsonIndexStart)
                objectJson = JSON.parse(sbsRow.substring(jsonIndexStart))
                if (Object.keys(objectJson).length === 0) {
                    return "Error content file"
                }
                sbsValues = beforeJson.split(',');
            } else {
                sbsValues = sbsRow.split(',');
            }


            /** Valeurs par défaut**/
            if (sbsValues[22] === undefined) {
                csvValues[12] = sbsValues[11]
                csvValues[14] = ""
                csvValues[15] = ""
                csvValues[16] = ""
            }

            /** Champs sbs **/
            let extraFields: ExtraFieldsSBS = {
                messageType : "",
                transmissionType : "",
                sessionID : "",
                aircraftID : "",
                flightID : "",
                emergency : ""
            }

            for (const champ of columnNames) {
                switch (champ) {
                    case "messageType":
                        extraFields.messageType = sbsValues[0]
                        break
                    case "transmissionType":
                        extraFields.transmissionType = sbsValues[1]
                        break
                    case "sessionID":
                        extraFields.sessionID = sbsValues[2]
                        break
                    case "aircraftID":
                        extraFields.aircraftID = sbsValues[3]
                        break
                    case "icao":
                        csvValues[1] = sbsValues[4]
                        break
                    case "flightID":
                        extraFields.flightID = sbsValues[5]
                        break
                    case "dateMessageGenerated":
                        csvValues[0] = getDateToTimestamp(sbsValues[6], sbsValues[7])
                        break
                    case "callsign":
                        csvValues[7] = sbsValues[10]
                        break
                    case "altitude":
                        csvValues[13] = sbsValues[11]
                        break
                    case "groundSpeed":
                        csvValues[4] = sbsValues[12]
                        break
                    case "track":
                        csvValues[5] = sbsValues[13]
                        break
                    case "latitude":
                        csvValues[2] = sbsValues[14]
                        break
                    case "longitude":
                        csvValues[3] = sbsValues[15]
                        break
                    case "verticalRate":
                        csvValues[6] = sbsValues[16]
                        break
                    case "squawk":
                        console.log()
                        if (sbsValues[17] === "") {
                            csvValues[11] = "NaN"
                        } else {
                            csvValues[11] = sbsValues[17]
                        }
                        break
                    case "alert":
                        if (sbsValues[18] === "1") {
                            csvValues[9] = "True"
                        } else {
                            csvValues[9] = "False"
                        }
                        break
                    case "emergency":
                        extraFields.emergency = sbsValues[19]
                        break
                    case "spi":
                        if (sbsValues[20] === "1") {
                            csvValues[10] = "True"
                        } else {
                            csvValues[10] = "False"
                        }
                        break
                    case "isOnGround":
                        if (sbsValues[21] === "1") {
                            csvValues[8] = "True"
                        } else {
                            csvValues[8] = "False"
                        }
                        break
                    case "extraField":

                        if (sbsValues[22] !== undefined) {
                            csvValues[12] = objectJson.baroaltitude
                            csvValues[14] = objectJson.lastposupdate
                            csvValues[15] = objectJson.lastcontact
                            csvValues[16] = objectJson.hour
                        }

                        break;
                }

            }

            if(saveExtraField){
                csvValues[17]="'"+JSON.stringify(extraFields)+"'"
            }

            let oneRow: string = csvValues.join(',')
            csvRows.push(oneRow);
        }
    }
    let csvContent: string = csvRows.join('\n')
    return csvContent
}