import { JsonMessage, OptionsConverter } from './types'
import { parse } from 'csv-parse/sync'
import { cleanEmptyProperties, fromSbsBoolean } from './utils/utils'

export function sbsToJson(
  sbsContent: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): JsonMessage[] {
  sbsContent=sbsContent.replace(/\n\s*$/, '')
  const lines: string[] = parse(sbsContent, { columns: false, quote: "'" })
  const jsonLines: JsonMessage[] = []
  for (const line of lines) {
    const [
      messageType,
      transmissionType,
      sessionID,
      aircraftID,
      hexIdent,
      flightID,
      dateMessageGenerated,
      timeMessageGenerated,
      dateMessageLogged,
      timeMessageLogged,
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
      haveLabel,
      label,
      ...maybeExtraFields
    ] = line
    if (!dateMessageGenerated || !timeMessageGenerated || !hexIdent) {
      console.error(
        `Date time or hexIdent (ICAO) is missing for message ${JSON.stringify(
          line,
        )}`,
      )
      continue
    }

    const jsonMessage: JsonMessage = {
      messageType,
      transmissionType: !transmissionType
        ? undefined
        : Number(transmissionType),
      sessionID: !sessionID ? undefined : Number(sessionID),
      aircraftID: !aircraftID ? undefined : Number(aircraftID),
      hexIdent,
      flightID: !flightID ? undefined : Number(flightID),
      dateMessageGenerated,
      timeMessageGenerated,
      dateMessageLogged,
      timeMessageLogged,
      callsign,
      altitude: !altitude ? undefined : Number(altitude),
      groundspeed: !groundspeed ? undefined : Number(groundspeed),
      track: !track ? undefined : Number(track),
      latitude: !latitude ? undefined : Number(latitude),
      longitude: !longitude ? undefined : Number(longitude),
      verticalRate: !verticalRate ? undefined : Number(verticalRate),
      squawk: !squawk ? undefined : Number(squawk),
      alert: fromSbsBoolean(alert),
      emergency: fromSbsBoolean(emergency),
      spi: fromSbsBoolean(spi),
      isOnGround: fromSbsBoolean(isOnGround),
    }

    let extraFields: Record<string, string> = {}
    if (fromSbsBoolean(haveLabel)) {
      jsonMessage.haveLabel = true
      jsonMessage.label = Number(label)
      if (options.saveExtraField) extraFields = JSON.parse(maybeExtraFields.join(','))
    } else {
      if (haveLabel !== undefined && haveLabel.includes('{')) {
        if (options.saveExtraField)
          extraFields = JSON.parse(
            [haveLabel, label, ...maybeExtraFields]
              .filter((item) => item !== undefined)
              .join(','),
          )
      }
    }
    cleanEmptyProperties(jsonMessage)
    jsonLines.push({ ...jsonMessage, ...extraFields })
  }
  return jsonLines
}
