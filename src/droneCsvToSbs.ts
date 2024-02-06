import { csvToJson } from './csvToJson'
import {
    getCsvDroneExtraFields,
    getCsvExtraFields,
    getDataType,
    getDateFromDroneToSbs,
    getTimeFromDroneToSbs,
    toSbsDate,
    toSbsTime
} from './utils/utils'
import { JsonMessage } from './types'
import { jsonToSbs } from './jsonToSbs'
import {droneCsvToJson} from "./droneCsvToJson";

export function droneCsvToSbs(csvContent: string): string {
    csvContent=csvContent.replace(/\n\s*$/, '')
    const csvJsonMessages = droneCsvToJson(csvContent, true)
    const sbsJsonMessages: JsonMessage[] = []
    for (const csvJsonMessage of csvJsonMessages) {

        const {
            name,
            icao24,
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

        if (!date || !icao24) {
            continue
        }


        let dateMessageGenerated : string =getDateFromDroneToSbs(`${date}`)
        let timeMessageGenerated : string =getTimeFromDroneToSbs(`${date}`)
        let dateMessageLogged : string =getDateFromDroneToSbs(`${date}`)
        let timeMessageLogged : string =getTimeFromDroneToSbs(`${date}`)
        sbsJsonMessages.push({
            dateMessageGenerated,
            timeMessageGenerated,
            dateMessageLogged,
            timeMessageLogged,
            hexIdent: icao24,
            groundSpeed: groundSpeed,
            verticalRate: "",
            isOnGround: "0",
            latitude : positionLatitude,
            longitude : positionLongitude,
            track : heading,
            callsign : name,
            alert : "0",
            spi : "0",
            squawk : "",
            altitude: positionAltitude,
            fixName : fixName,
            significantPoint : significantPoint,
            "timeElapsed (s)" : timeElapsed,
            "altitudeMax (ft)": altitudeMax,
            "airSpeed (kt)": airSpeed,
            "cas (kt)": cas,
            mach: mach,
            "distanceToNextWaypoint (NM)": distanceToNextWaypoint,
            "flownDistance (NM)": flownDistance,
            "wind.eastward (kt)": windEastward,
            "wind.northward (kt)": windNorthward,
            "wind.upward (ft/min)": windUpward,
            "route (deg)": route,
            "mass (kg)": mass,
            isOneWay: isOneWay,
            ...getCsvDroneExtraFields(csvJsonMessage),
        })

    }
    return jsonToSbs(JSON.stringify(sbsJsonMessages), true)


}
