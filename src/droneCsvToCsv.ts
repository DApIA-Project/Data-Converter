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
            altitude: positionAltitude,
            geoaltitude: positionAltitude,
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
            ...getCsvDroneExtraFields(csvDroneJsonMessage ),
        })

    }
    return jsonToCsv(JSON.stringify(csvJsonMessages), true)


}
