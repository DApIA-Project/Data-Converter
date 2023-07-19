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