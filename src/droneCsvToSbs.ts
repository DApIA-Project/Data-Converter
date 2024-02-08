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
            timeElapsed,
            "position.latitude" : positionLatitude,
            "position.longitude" : positionLongitude,
            "position.altitude" : positionAltitude,
            altitudeMax,
            airSpeed ,
            cas ,
            mach,
            heading ,
            groundSpeed ,
            distanceToNextWaypoint ,
            flownDistance ,
            "wind.eastward" : windEastward,
            "wind.northward" : windNorthward,
            "wind.upward" : windUpward,
            route ,
            mass ,
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
            groundSpeed,
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
            fixName ,
            significantPoint ,
            timeElapsed ,
            altitudeMax,
            airSpeed,
            cas,
            mach,
            distanceToNextWaypoint,
            flownDistance,
            "wind.eastward": windEastward,
            "wind.northward": windNorthward,
            "wind.upward": windUpward,
            route,
            mass,
            isOneWay,
            ...getCsvDroneExtraFields(csvJsonMessage),
        })

    }
    return jsonToSbs(JSON.stringify(sbsJsonMessages), true)


}
