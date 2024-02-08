import { openskyCsvToJson } from './openskyCsvToJson'
import { getCsvOpenskyExtraFields, toSbsDate, toSbsTime } from './utils/utils'
import { JsonMessage } from './types'
import { jsonToSbs } from './jsonToSbs'

export function openskyCsvToSbs(openskyCsvContent: string): string {
  openskyCsvContent=openskyCsvContent.replace(/\n\s*$/, '')
  const openskyCsvJsonMessages = openskyCsvToJson(openskyCsvContent, true)
  const sbsJsonMessages: JsonMessage[] = []

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

    const dateMessageGenerated = toSbsDate(`${timestamp}`)
    const timeMessageGenerated = toSbsTime(`${timestamp}`)
    const dateMessageLogged = toSbsDate(`${timestamp}`)
    const timeMessageLogged = toSbsTime(`${timestamp}`)

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
      baroaltitude: altitude,
      ...getCsvOpenskyExtraFields(openskyCsvJsonMessage),
    })
  }
  return jsonToSbs(JSON.stringify(sbsJsonMessages), true)
}
