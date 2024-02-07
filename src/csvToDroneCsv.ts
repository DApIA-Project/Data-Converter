import { csvToJson } from './csvToJson'
import {getCsvExtraFields, toDroneCsvDate, toSbsDate, toSbsTime} from './utils/utils'
import { JsonMessage } from './types'
import { jsonToSbs } from './jsonToSbs'
import {jsonToDroneCsv} from "./jsonToDroneCsv";

export function csvToDroneCsv(csvContent: string): string {
    csvContent=csvContent.replace(/\n\s*$/, '')
    const csvJsonMessages = csvToJson(csvContent, true)
    const csvDroneJsonMessages: JsonMessage[] = []

    for (const csvJsonMessage of csvJsonMessages) {
        const {
            timestamp,
            icao24,
            latitude,
            longitude,
            groundspeed,
            track,
            vertical_rate,
            callsign,
            onground,
            alert,
            spi,
            squawk,
            altitude,
            geoaltitude,
            last_position,
            lastcontact,
            hour,
        } = csvJsonMessage

        if (!timestamp || !icao24) {
            continue
        }

        const date = toDroneCsvDate(timestamp.toString())

        csvDroneJsonMessages.push({
            name : callsign,
            icao24: icao24,
            date: date,
            fixName : "",
            significantPoint : "",
            "timeElapsed (s)" : "",
            "position.latitude (deg)" : latitude,
            "position.longitude (deg)" : longitude,
            "position.altitude (ft)" : geoaltitude,
            "altitudeMax (ft)" : "",
            "airSpeed (kt)" : "",
            "cas (kt)" : "",
            mach : "",
            "heading (deg)" : track,
            "groundSpeed (kt)" : groundspeed,
            "distanceToNextWaypoint (NM)" : "",
            "flownDistance (NM)" : "",
            "wind.eastward (kt)" : "",
            "wind.northward (kt)" : "",
            "wind.upward (ft/min)" : "",
            "route (deg)" : "",
            "mass (kg)" : "",
            isOneWay : "",
            vertical_rate : vertical_rate,
            onground : onground,
            alert : alert,
            spi : spi,
            squawk : squawk,
            baroaltitude : altitude,
            last_position : last_position,
            lastcontact : lastcontact,
            hour : hour,
            ...getCsvExtraFields(csvJsonMessage),
        })
    }
    return jsonToDroneCsv(JSON.stringify(csvDroneJsonMessages), true)
}
