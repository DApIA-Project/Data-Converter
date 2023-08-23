import {getDateToTimestamp} from "./SbsToCsv";

export function convertSBStoJSON(sbsContent: string): string {
    const sbsRows: string[] = sbsContent.split('\n');
    let jsonContent : {}[] = []

    for (let sbsRow of sbsRows) {
        sbsRow = sbsRow.replace(/[\s\r]+/g, '')
        let elements : string[] = sbsRow.split(',')
        jsonContent.push(
            {
                messageType : elements[0],
                transmissionType : elements[1],
                sessionID : elements[2],
                aircraftID : elements[3],
                icao24 : elements[4],
                flightID : elements[5],
                dateMessageGenerated : elements[6],
                timeMessageGenerated : elements[7],
                dateMessageLogged : elements[8],
                timeMessageLogged : elements[9],
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
                onground : elements[21],

                timestamp : getDateToTimestamp(elements[6], elements[7]),

                haveLabel : elements.length > 22 ? elements[22] : '',
                label : elements.length > 23 ? elements[23] : '',
            }
        )


    }

    return JSON.stringify(jsonContent)
}