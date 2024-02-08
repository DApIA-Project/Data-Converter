import { openskyCsvToJson } from './openskyCsvToJson'
import {getCsvOpenskyExtraFields, toDroneCsvDate, toSbsDate, toSbsTime} from './utils/utils'
import { JsonMessage } from './types'
import { jsonToSbs } from './jsonToSbs'
import {jsonToDroneCsv} from "./jsonToDroneCsv";

export function openskyCsvToDroneCsv(openskyCsvContent: string): string {
    openskyCsvContent=openskyCsvContent.replace(/\n\s*$/, '')
    const openskyCsvJsonMessages = openskyCsvToJson(openskyCsvContent, true)
    const csvDroneJsonMessages: JsonMessage[] = []

    for (const openskyCsvJsonMessage of openskyCsvJsonMessages) {
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
        } = openskyCsvJsonMessage

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
            timeElapsed : "",
            "position.latitude" : latitude,
            "position.longitude" : longitude,
            "position.altitude" : geoaltitude,
            altitudeMax : "",
            airSpeed : "",
            cas : "",
            mach : "",
            heading : track,
            groundSpeed : groundspeed,
            distanceToNextWaypoint : "",
            flownDistance : "",
            "wind.eastward" : "",
            "wind.northward" : "",
            "wind.upward" : "",
            route : "",
            mass : "",
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
            ...getCsvOpenskyExtraFields(openskyCsvJsonMessage),
        })
    }
    return jsonToDroneCsv(JSON.stringify(csvDroneJsonMessages), true)
}
