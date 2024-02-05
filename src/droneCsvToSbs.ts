import { csvToJson } from './csvToJson'
import {
    getCsvExtraFields,
    getDataType,
    getDateFromDroneToSbs,
    getTimeFromDroneToSbs,
    toSbsDate,
    toSbsTime
} from './utils/utils'
import { JsonMessage } from './types'
import { jsonToSbs } from './jsonToSbs'

export function droneCsvToSbs(csvContent: string): string {
    csvContent=csvContent.replace(/\n\s*$/, '')
    const csvJsonMessages = csvToJson(csvContent, true)
    const sbsJsonMessages: JsonMessage[] = []
    for (const csvJsonMessage of csvJsonMessages) {

        const {
            name,
            date,
            fixName,
            significantPoint,
            "timeElapsed (s)" : timeElapsed,
            "position.latitude (deg)" : positionLatitude,
            "position.longitude (deg)" : positionLongitude,
            "position.altitude (ft)" : positionAltitude,
            "altitudeMax (ft)" : altitudeMax,
            "airSpeed (kt)" : airSpeed,
            "cas (kt)" : cas,
            mach,
            "heading (deg)" : heading,
            "groundSpeed (kt)" : groundSpeed,
            "distanceToNextWaypoint (NM)" : distanceToNextWaypoint,
            "flownDistance (NM)" : flownDistance,
            "wind.eastward (kt)" : windEastward,
            "wind.northward (kt)" : windNorthward,
            "wind.upward (ft/min)" : windUpward,
            "route (deg)" : route,
            "mass (kg)" : mass,
            isOneWay
        } = csvJsonMessage


        let dateMessageGenerated : string =getDateFromDroneToSbs(`${date}`)
        let timeMessageGenerated : string =getTimeFromDroneToSbs(`${date}`)
        let dateMessageLogged : string =getDateFromDroneToSbs(`${date}`)
        let timeMessageLogged : string =getTimeFromDroneToSbs(`${date}`)
        sbsJsonMessages.push({
            dateMessageGenerated,
            timeMessageGenerated,
            dateMessageLogged,
            timeMessageLogged,
            hexIdent: name,
            groundSpeed: groundSpeed,
            verticalRate: "",
            isOnGround: "0",
            latitude : positionLatitude,
            longitude : positionLongitude,
            track : heading,
            callsign : "",
            alert : "0",
            spi : "0",
            squawk : "",
            altitude: positionAltitude,
            last_position : "",
            lastcontact : "",
            hour : "",
            baroaltitude: positionAltitude,
            ...getCsvExtraFields(csvJsonMessage),
        })

    }
    return jsonToSbs(JSON.stringify(sbsJsonMessages), true)


}
