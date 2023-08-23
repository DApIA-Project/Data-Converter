export function convertNDJSONtoSBS(ndjsonContentString: string): string {
    const ndjsonLines = ndjsonContentString.split('\n');
    const jsonObjects = [];
    for (const ndjsonLine of ndjsonLines) {
        if (ndjsonLine.trim() === '') {
            continue; // Ignorez les lignes vides
        }

        try {
            const jsonObject = JSON.parse(ndjsonLine);
            jsonObjects.push(jsonObject);
        } catch (error) {
            console.error('Erreur lors de l\'analyse JSON :', error);
        }
    }

    let sbsString : string = ''
    for (const jsonContentElement of jsonObjects) {
        sbsString = sbsString
            + jsonContentElement.messageType + ","
            + jsonContentElement.transmissionType + ","
            + jsonContentElement.sessionID + ","
            + jsonContentElement.aircraftID + ","
            + jsonContentElement.icao24 + ","
            + jsonContentElement.flightID + ","
            + jsonContentElement.dateMessageGenerated + ","
            + jsonContentElement.timeMessageGenerated + ","
            + jsonContentElement.dateMessageLogged + ","
            + jsonContentElement.timeMessageLogged + ","
            + (jsonContentElement.callsign === undefined ? '' : jsonContentElement.callsign) + ","
            + (jsonContentElement.altitude === undefined ? '' : jsonContentElement.altitude) + ","
            + (jsonContentElement.groundspeed === undefined ? '' : jsonContentElement.groundspeed) + ","
            + (jsonContentElement.track === undefined ? '' : jsonContentElement.track) + ","
            + (jsonContentElement.latitude === undefined ? '' : jsonContentElement.latitude) + ","
            + (jsonContentElement.longitude === undefined ? '' : jsonContentElement.longitude) + ","
            + (jsonContentElement.vertical_rate === undefined ? '' : jsonContentElement.vertical_rate) + ","
            + (jsonContentElement.squawk === undefined ? '' : jsonContentElement.squawk) + ","
            + (jsonContentElement.alert === undefined ? '' : jsonContentElement.alert) + ","
            + (jsonContentElement.emergency === undefined ? '' : jsonContentElement.emergency) + ","
            + (jsonContentElement.spi === undefined ? '' : jsonContentElement.spi) + ","
            + (jsonContentElement.onground === undefined ? '' : jsonContentElement.onground)

        if(jsonContentElement.haveLabel != ''){
            sbsString = sbsString + "," + jsonContentElement.haveLabel + "," + jsonContentElement.label
        }

        sbsString = sbsString + "\n"
    }

    return sbsString
}