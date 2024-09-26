import {getDateFromSbsToDroneCsv, getSbsExtraFields} from './utils/utils'
import { JsonMessage, OptionsConverter } from './types'
import { sbsToJson } from './sbsToJson'
import {jsonToDroneCsv} from "./jsonToDroneCsv";

export function sbsToDroneCsv(sbsContent: string, options : OptionsConverter = {saveExtraField: false, mustMerge: false}): string {
    sbsContent=sbsContent.replace(/\n\s*$/, '')
    const sbsJsonMessages = sbsToJson(sbsContent, {saveExtraField: true, mustMerge: options.mustMerge})
    const droneCsvJsonMessages: JsonMessage[] = []

    for (const sbsJsonMessage of sbsJsonMessages) {
        const {
            dateMessageGenerated,
            timeMessageGenerated,
            hexIdent,
            aircraftID,
            messageType,
            transmissionType,
            sessionID,
            flightID,
            callsign,
            altitude,
            groundspeed,
            track,
            latitude,
            longitude,
            verticalRate,
            squawk,
            alert,
            emergency,
            spi,
            isOnGround,
        } = sbsJsonMessage

        if (!dateMessageGenerated || !timeMessageGenerated || !hexIdent) {
            continue
        }

        try {
            droneCsvJsonMessages.push({
                name: callsign,
                icao24: hexIdent,
                date: getDateFromSbsToDroneCsv(dateMessageGenerated.toString(),timeMessageGenerated.toString()),
                fixName: "",
                significantPoint: "",
                timeElapsed : "",
                "position.latitude" : latitude,
                "position.longitude" : longitude,
                "position.altitude" : altitude,
                altitudeMax : "",
                airSpeed : "",
                cas : "",
                mach : "",
                heading : track,
                groundspeed,
                distanceToNextWaypoint : "",
                flownDistance : "",
                "wind.eastward" : "",
                "wind.northward" : "",
                "wind.upward" : "",
                route : "",
                mass : "",
                isOneWay : "",
                aircraftID,
                messageType,
                transmissionType,
                sessionID,
                flightID,
                emergency,
                verticalRate,
                squawk,
                alert,
                spi,
                isOnGround,
                ...getSbsExtraFields({ ...sbsJsonMessage, baroaltitude: undefined }),
            })
        } catch (ignored) {
            console.error(
                `Invalid date time: ${dateMessageGenerated} ${timeMessageGenerated}`,
            )
        }

    }
    return jsonToDroneCsv(JSON.stringify(droneCsvJsonMessages), {saveExtraField: options.saveExtraField, mustMerge: false})
}
