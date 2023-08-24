export interface ExtraFieldsSBS {
    messageType : string;
    transmissionType : string;
    sessionID : string;
    aircraftID : string;
    flightID : string;
    emergency : string;

    haveLabel? : string
    label? : string

}

export interface ExtraFieldsCSV {
    altitude: string;
    last_position: string;
    lastcontact: string
    hour: string

}


export interface JsonFromSbs {

    messageType : string,
    transmissionType : string,
    sessionID : string,
    aircraftID : string,
    icao24 : string | number,
    flightID : string,
    dateMessageGenerated : string | number,
    timeMessageGenerated : string | number,
    dateMessageLogged : string | number,
    timeMessageLogged : string | number,
    callsign : string,
    altitude : string,
    groundspeed : string,
    track : string,
    latitude : string,
    longitude : string,
    vertical_rate : string,
    squawk : string,
    alert : string,
    emergency : string,
    spi : string,
    onground : string,
    haveLabel? : string,
    label? : string

}