import { getSbsExtraFields, toCsvTimestamp } from './utils/utils'
import { JsonMessage } from './types'
import { jsonToCsv } from './jsonToCsv'
import { sbsToJson } from './sbsToJson'

export function sbsToCsv(sbsContent: string): string {
  const sbsJsonMessages = sbsToJson(sbsContent, true)
  const csvJsonMessages: JsonMessage[] = []

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

    // const csvAltitude = Number(`${altitude}`) * 2 - Number(`${geoaltitude}`)

    try {
      csvJsonMessages.push({
        timestamp: toCsvTimestamp(
          `${dateMessageGenerated}`,
          `${timeMessageGenerated}`,
        ),
        icao24: hexIdent,
        groundspeed: groundSpeed,
        vertical_rate: verticalRate,
        onground: isOnGround,
        latitude,
        longitude,
        track,
        callsign,
        alert,
        spi,
        squawk,
        geoaltitude: altitude,
        aircraftID,
        messageType,
        transmissionType,
        sessionID,
        flightID,
        emergency,
        ...getSbsExtraFields(sbsJsonMessage),
      })
    } catch (ignored) {
      console.error(
        `Invalid date time: ${dateMessageGenerated} ${timeMessageGenerated}`,
      )
    }
  }
  return jsonToCsv(JSON.stringify(csvJsonMessages), true)
}
