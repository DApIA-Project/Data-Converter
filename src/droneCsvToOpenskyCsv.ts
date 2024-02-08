import {
    getCsvDroneExtraFields,
    getTimestampFromDroneToCsv
} from './utils/utils'
import { JsonMessage } from './types'
import {droneCsvToJson} from "./droneCsvToJson";
import {jsonToOpenskyCsv} from "./jsonToOpenskyCsv";

export function droneCsvToOpenskyCsv(openskyCsvContent: string): string {
    openskyCsvContent=openskyCsvContent.replace(/\n\s*$/, '')
    const csvDroneJsonMessages = droneCsvToJson(openskyCsvContent, true)
    const openskyCsvJsonMessages: JsonMessage[] = []


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
            groundspeed,
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

        openskyCsvJsonMessages.push({
            timestamp: getTimestampFromDroneToCsv(
                `${date}`,
            ),
            icao24: icao24,
            groundspeed,
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
    return jsonToOpenskyCsv(JSON.stringify(openskyCsvJsonMessages), true)


}
