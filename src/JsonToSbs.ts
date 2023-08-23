export function convertJSONtoSBS(jsonContentString: string): string {
    let jsonContent = JSON.parse(jsonContentString);
    let sbsString : string = ''
    for (const jsonContentElement of jsonContent) {
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
        + jsonContentElement.callsign + ","
        + jsonContentElement.altitude + ","
        + jsonContentElement.groundspeed + ","
        + jsonContentElement.track + ","
        + jsonContentElement.latitude + ","
        + jsonContentElement.longitude + ","
        + jsonContentElement.vertical_rate + ","
        + jsonContentElement.squawk + ","
        + jsonContentElement.alert + ","
        + jsonContentElement.emergency + ","
        + jsonContentElement.spi + ","
        + jsonContentElement.onground

        if(jsonContentElement.haveLabel != ''){
            sbsString = sbsString + "," + jsonContentElement.haveLabel + "," + jsonContentElement.label
        }

        sbsString = sbsString + "\n"
    }

    return sbsString
}