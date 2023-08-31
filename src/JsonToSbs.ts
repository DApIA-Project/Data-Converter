import {buildBooleanValueForSbs, buildDateValue, buildSquawkValueForSbs, buildTimeValue} from "./utils/utils";


export function convertJSONtoSBS(jsonContentString: string, saveExtraField : boolean = false): string {
    let idForPlane: Map<string, number> = new Map<string, number>();
    let cptID = 1;
    let jsonContent = JSON.parse(jsonContentString);
    let sbsString : string = ''
    let index = 1;
    for (const jsonContentElement of jsonContent) {
        let oneString : string = ''
        let arrayErrors : string[] = []
        oneString = (jsonContentElement.messageType === undefined || jsonContentElement.messageType === '' ? 'MSG' : jsonContentElement.messageType) + ","
        + (jsonContentElement.transmissionType === undefined || jsonContentElement.transmissionType === '' ? '3' : jsonContentElement.transmissionType) + ","
        + (jsonContentElement.sessionID === undefined || jsonContentElement.sessionID === '' ? '1' : jsonContentElement.sessionID) + ","
        + (jsonContentElement.aircraftID === undefined || jsonContentElement.aircraftID === '' ? !idForPlane.has(jsonContentElement.icao24) ? (() => {
            idForPlane.set(jsonContentElement.icao24, cptID)
            cptID++
            return cptID-1


            })() : (idForPlane.get(jsonContentElement.icao24))!.toString() : jsonContentElement.aircraftID) + ","
        + (jsonContentElement.icao24 === undefined || jsonContentElement.icao24 === '' ? arrayErrors.push(`Error line ${index} : No ICAO found in this message : ${sbsString}`) : jsonContentElement.icao24) + ","
        + (jsonContentElement.flightID === undefined || jsonContentElement.flightID === '' ? !idForPlane.has(jsonContentElement.icao24) ? (() => {
                idForPlane.set(jsonContentElement.icao24, cptID)
                cptID++
                return cptID-1


            })() : (idForPlane.get(jsonContentElement.icao24))!.toString() : jsonContentElement.flightID) + ","
        + (jsonContentElement.dateMessageGenerated === undefined || jsonContentElement.dateMessageGenerated === '' ? buildDateValue(jsonContentElement) === "Error" ? arrayErrors.push(`Error line ${index} : No date is found in this message : ${sbsString}`) : buildDateValue(jsonContentElement) : jsonContentElement.dateMessageGenerated) + ","
        + (jsonContentElement.timeMessageGenerated === undefined || jsonContentElement.timeMessageGenerated === '' ? buildTimeValue(jsonContentElement) === "Error" ? arrayErrors.push(`Error line ${index} : No time is found in this message : ${sbsString}`) : buildTimeValue(jsonContentElement) : jsonContentElement.timeMessageGenerated)+ ","
        + (jsonContentElement.dateMessageLogged === undefined || jsonContentElement.dateMessageLogged === '' ? buildDateValue(jsonContentElement) === "Error" ? arrayErrors.push(`Error line ${index} : No date is found in this message : ${sbsString}`) : buildDateValue(jsonContentElement) : jsonContentElement.dateMessageLogged)+ ","
        + (jsonContentElement.timeMessageLogged === undefined || jsonContentElement.timeMessageLogged === '' ? buildTimeValue(jsonContentElement) === "Error" ? arrayErrors.push(`Error line ${index} : No time is found in this message : ${sbsString}`) : buildTimeValue(jsonContentElement): jsonContentElement.timeMessageLogged)+ ","
        + (jsonContentElement.callsign === undefined || jsonContentElement.callsign === '' ? '' : jsonContentElement.callsign) + ","
        + (jsonContentElement.geoaltitude === undefined || jsonContentElement.geoaltitude === '' ? '' : jsonContentElement.geoaltitude)+ ","
        + (jsonContentElement.groundspeed === undefined || jsonContentElement.groundspeed === '' ? '' : jsonContentElement.groundspeed)+ ","
        + (jsonContentElement.track === undefined || jsonContentElement.track === '' ? '' : jsonContentElement.track)+ ","
        + (jsonContentElement.latitude === undefined || jsonContentElement.latitude === '' ? '' : jsonContentElement.latitude)+ ","
        + (jsonContentElement.longitude === undefined || jsonContentElement.longitude === '' ? '' : jsonContentElement.longitude)+ ","
        + (jsonContentElement.vertical_rate === undefined || jsonContentElement.vertical_rate === '' ? '' : jsonContentElement.vertical_rate)+ ","
        + buildSquawkValueForSbs(jsonContentElement.squawk) + ","
        + (buildBooleanValueForSbs(jsonContentElement.alert) === 'Error' ? arrayErrors.push(`Error line ${index} : Alert is not well-formed in this message : ${sbsString}`) : buildBooleanValueForSbs(jsonContentElement.alert)) + ","
        + (jsonContentElement.emergency === undefined || jsonContentElement.emergency === '' ? '0' : jsonContentElement.emergency) + ","
        + (buildBooleanValueForSbs(jsonContentElement.spi) === 'Error' ? arrayErrors.push(`Error line ${index} : Spi is not well-formed in this message : ${sbsString}`) : buildBooleanValueForSbs(jsonContentElement.spi)) + ","
        + (buildBooleanValueForSbs(jsonContentElement.onground) === 'Error' ? arrayErrors.push(`Error line ${index} : OnGround is not well-formed in this message : ${sbsString}`) : buildBooleanValueForSbs(jsonContentElement.onground))

        if(jsonContentElement.haveLabel !== '' && jsonContentElement.haveLabel !== undefined && jsonContentElement.label !== '' && jsonContentElement.label !== undefined){
            oneString = oneString + "," + jsonContentElement.haveLabel + "," + jsonContentElement.label
        }else{
            if((jsonContentElement.label === '' || jsonContentElement.label === undefined) && (jsonContentElement.haveLabel !== '' && jsonContentElement.haveLabel !== undefined)){
                arrayErrors.push(`Error line ${index} : No Label is present in this message : ${sbsString}`)
            }

            if((jsonContentElement.haveLabel === '' || jsonContentElement.haveLabel === undefined) && (jsonContentElement.label !== '' && jsonContentElement.label !== undefined)){
                arrayErrors.push(`Error line ${index} : No haveLabel is present in this message : ${sbsString}`)
            }
        }

        if(saveExtraField){
            let extraField : {[key: string] : any} = {
                'altitude' : jsonContentElement.altitude,
                'last_position': jsonContentElement.last_position,
                'lastcontact': jsonContentElement.lastcontact,
                'hour': jsonContentElement.hour
            }
           oneString = oneString + ',' +JSON.stringify(extraField)
        }

        oneString = oneString + "\n"

        if(arrayErrors.length>0){
            for (const arrayError of arrayErrors) {
                console.error(arrayError)
            }
        }else{
            sbsString = sbsString + oneString
        }

        index++
    }

    return sbsString
}