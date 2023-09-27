import { csvToJson } from './csvToJson'
import { getCsvExtraFields, toSbsDate, toSbsTime } from './utils/utils'
import { JsonMessage } from './types'
import { jsonToSbs } from './jsonToSbs'

export function csvToSbs(csvContent: string): string {
  const csvJsonMessages = csvToJson(csvContent, true)
  const sbsJsonMessages: JsonMessage[] = []

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

    const dateMessageGenerated = toSbsDate(`${timestamp}`)
    const timeMessageGenerated = toSbsTime(`${timestamp}`)
    const dateMessageLogged = toSbsDate(`${timestamp}`)
    const timeMessageLogged = toSbsTime(`${timestamp}`)
    const sbsAltitude =
      (parseFloat(`${altitude}`) + parseFloat(`${geoaltitude}`)) / 2

    sbsJsonMessages.push({
      dateMessageGenerated,
      timeMessageGenerated,
      dateMessageLogged,
      timeMessageLogged,
      hexIdent: icao24,
      groundSpeed: groundspeed,
      verticalRate: vertical_rate,
      isOnGround: onground,
      latitude,
      longitude,
      track,
      callsign,
      alert,
      spi,
      squawk,
      altitude: geoaltitude,
      last_position,
      lastcontact,
      hour,
      ...getCsvExtraFields(csvJsonMessage),
    })
  }
  return jsonToSbs(JSON.stringify(sbsJsonMessages), true)
}
