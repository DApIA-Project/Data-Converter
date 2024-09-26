import { getSbsExtraFields, toCsvOpenskyTimestamp } from './utils/utils'
import { JsonMessage, OptionsConverter } from './types'
import { jsonToOpenskyCsv } from './jsonToOpenskyCsv'
import { sbsToJson } from './sbsToJson'

export function sbsToOpenskyCsv(sbsContent: string, options : OptionsConverter = {saveExtraField: false, mustMerge: false}): string {
  sbsContent=sbsContent.replace(/\n\s*$/, '')
  const sbsJsonMessages = sbsToJson(sbsContent, {saveExtraField: true, mustMerge: options.mustMerge})
  const openskyCsvJsonMessages: JsonMessage[] = []

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
      baroaltitude,
    } = sbsJsonMessage

    if (!dateMessageGenerated || !timeMessageGenerated || !hexIdent) {
      continue
    }

    try {
      openskyCsvJsonMessages.push({
        timestamp: toCsvOpenskyTimestamp(
          `${dateMessageGenerated}`,
          `${timeMessageGenerated}`,
        ),
        icao24: hexIdent,
        groundspeed,
        vertical_rate: verticalRate,
        onground: isOnGround,
        latitude,
        longitude,
        track,
        callsign,
        alert,
        spi,
        squawk,
        altitude: baroaltitude,
        geoaltitude: altitude,
        aircraftID,
        messageType,
        transmissionType,
        sessionID,
        flightID,
        emergency,
        ...getSbsExtraFields({ ...sbsJsonMessage, baroaltitude: undefined }),
      })
    } catch (ignored) {
      console.error(
        `Invalid date time: ${dateMessageGenerated} ${timeMessageGenerated}`,
      )
    }
  }
  return jsonToOpenskyCsv(JSON.stringify(openskyCsvJsonMessages), {saveExtraField: options.saveExtraField, mustMerge: false})
}
