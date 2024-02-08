import { csvToJson } from './csvToJson'
import {
    getCsvDroneExtraFields,
    getCsvExtraFields,
    getDataType,
    getDateFromDroneToSbs, getSbsExtraFields,
    getTimeFromDroneToSbs, getTimestampFromDroneToCsv, toCsvTimestamp,
    toSbsDate,
    toSbsTime
} from './utils/utils'
import { JsonMessage } from './types'
import { jsonToSbs } from './jsonToSbs'
import {droneCsvToJson} from "./droneCsvToJson";
import {jsonToCsv} from "./jsonToCsv";

export function droneCsvToCsv(csvContent: string): string {
    csvContent=csvContent.replace(/\n\s*$/, '')
    const csvDroneJsonMessages = droneCsvToJson(csvContent, true)
    const csvJsonMessages: JsonMessage[] = []


    for (const csvDroneJsonMessage of csvDroneJsonMessages) {

        const {
            name,
            icao24,
            date,
            fixName,
            significantPoint,
            timeElapsed ,
            "position.latitude" : positionLatitude,
            "position.longitude" : positionLongitude,
            "position.altitude" : positionAltitude,
            altitudeMax,
            airSpeed,
            cas,
            mach,
            heading,
            groundSpeed,
            distanceToNextWaypoint,
            flownDistance,
            "wind.eastward" : windEastward,
            "wind.northward" : windNorthward,
            "wind.upward" : windUpward,
            route,
            mass,
            isOneWay
        } = csvDroneJsonMessage

        if (!date || !icao24) {
            continue
        }

        csvJsonMessages.push({
            timestamp: getTimestampFromDroneToCsv(
                `${date}`,
            ),
            icao24: icao24,
            groundspeed: groundSpeed,
            vertical_rate: "",
            onground: "",
            latitude : positionLatitude,
            longitude : positionLongitude,
            track : heading,
            callsign : name,
            alert : "",
            spi : "",
            squawk : "",
            altitude: "",
            geoaltitude: positionAltitude,
            fixName,
            significantPoint,
            timeElapsed,
            altitudeMax,
            airSpeed,
            cas,
            mach: mach,
            distanceToNextWaypoint,
            flownDistance,
            "wind.eastward": windEastward,
            "wind.northward": windNorthward,
            "wind.upward": windUpward,
            route,
            mass,
            isOneWay: isOneWay,
            ...getCsvDroneExtraFields(csvDroneJsonMessage ),
        })

    }
    return jsonToCsv(JSON.stringify(csvJsonMessages), true)


}
