import {getDateFromSbsToDroneCsv, getSbsExtraFields, toCsvTimestamp} from './utils/utils'
import { JsonMessage } from './types'
import { jsonToCsv } from './jsonToCsv'
import { sbsToJson } from './sbsToJson'
import {jsonToDroneCsv} from "./jsonToDroneCsv";

export function sbsToDroneCsv(sbsContent: string, saveExtrafield : boolean = false): string {
    sbsContent=sbsContent.replace(/\n\s*$/, '')
    const sbsJsonMessages = sbsToJson(sbsContent, true)
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
            groundSpeed,
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
                "timeElapsed (s)" : "",
                "position.latitude (deg)" : latitude,
                "position.longitude (deg)" : longitude,
                "position.altitude (ft)" : altitude,
                "altitudeMax (ft)" : "",
                "airSpeed (kt)" : "",
                "cas (kt)" : "",
                mach : "",
                "heading (deg)" : track,
                "groundSpeed (kt)" : groundSpeed,
                "distanceToNextWaypoint (NM)" : "",
                "flownDistance (NM)" : "",
                "wind.eastward (kt)" : "",
                "wind.northward (kt)" : "",
                "wind.upward (ft/min)" : "",
                "route (deg)" : "",
                "mass (kg)" : "",
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
    return jsonToDroneCsv(JSON.stringify(droneCsvJsonMessages), saveExtrafield)
}
