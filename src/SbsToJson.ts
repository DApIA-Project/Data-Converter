import {JsonFromSbs} from "./types";

export function convertSBStoJSON(sbsContent: string): string {
    const sbsRows: string[] = sbsContent.split('\n');
    let jsonContent : {}[] = []

    for (let sbsRow of sbsRows) {
        let index = 1
        let oneJsonObject : JsonFromSbs = {
            aircraftID: "",
            alert: "",
            altitude: "",
            callsign: "",
            dateMessageGenerated: "",
            dateMessageLogged: "",
            emergency: "",
            flightID: "",
            groundspeed: "",
            icao24: "",
            latitude: "",
            longitude: "",
            messageType: "",
            onground: "",
            sessionID: "",
            spi: "",
            squawk: "",
            timeMessageGenerated: "",
            timeMessageLogged: "",
            track: "",
            transmissionType: "",
            vertical_rate: ""
        }
        let arrayErrors : string[] = []
        sbsRow = sbsRow.replace(/[\s\r]+/g, '')
        let elements : string[] = sbsRow.split(',')
        if(elements.length >=22){
            oneJsonObject =
                {
                    messageType : elements[0],
                    transmissionType : elements[1],
                    sessionID : elements[2],
                    aircraftID : elements[3],
                    icao24 : (elements[4] === '' ? arrayErrors.push(`Error line ${index} : No ICAO found in this message : ${sbsRow}`) : elements[4]),
                    flightID : elements[5],
                    dateMessageGenerated : (elements[6] === '' ? arrayErrors.push(`Error line ${index} : No date message generated found in this message : ${sbsRow}`) : elements[6]),
                    timeMessageGenerated : (elements[7] === '' ? arrayErrors.push(`Error line ${index} : No time message generated found in this message : ${sbsRow}`) : elements[7]),
                    dateMessageLogged : (elements[8] === '' ? arrayErrors.push(`Error line ${index} : No date message logged found in this message : ${sbsRow}`) : elements[8]),
                    timeMessageLogged : (elements[9] === '' ? arrayErrors.push(`Error line ${index} : No time message logged found in this message : ${sbsRow}`) : elements[9]),
                    callsign : elements[10],
                    altitude : elements[11],
                    groundspeed : elements[12],
                    track : elements[13],
                    latitude : elements[14],
                    longitude : elements[15],
                    vertical_rate : elements[16],
                    squawk : elements[17],
                    alert : elements[18],
                    emergency : elements[19],
                    spi : elements[20],
                    onground : elements[21]
                }

                if(elements.length > 23){
                    oneJsonObject.haveLabel = elements[22]
                    oneJsonObject.label = elements[23]

                }
        }else{
            arrayErrors.push(`Error line ${index} : Missing information (minimum 22 attributes) found: ${elements.length} in the message : ${sbsRow}`)
        }


        if(arrayErrors.length>0){
            for (const arrayError of arrayErrors) {
                console.error(arrayError)
            }
        }else{
            jsonContent.push(oneJsonObject)
        }

        index++


    }

    return JSON.stringify(jsonContent)
}