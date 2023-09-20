import { toSbsBoolean } from './utils/utils'
import { JsonMessage } from './types'

export function jsonToSbs(
  jsonContentString: string,
  saveExtraField: boolean = false,
): string {
  const json = JSON.parse(jsonContentString)
  if (!Array.isArray(json)) throw new Error('JSON data must be an array')

  const messages = json as JsonMessage[]
  const sbsLines: string[] = []
  let aircraftNumber = 1
  const aircraftIdByIcao = new Map<string, string>()
  for (const message of messages) {
    const {
      dateMessageGenerated,
      timeMessageGenerated,
      dateMessageLogged,
      timeMessageLogged,
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
      haveLabel,
      label,
    } = message

    const icao = `${hexIdent}`

    if (!dateMessageGenerated || !timeMessageGenerated || !hexIdent) {
      console.error(
        `Date time or hexIdent (ICAO) is missing for message ${JSON.stringify(
          message,
        )}`,
      )
      continue
    }

    if (!aircraftIdByIcao.has(icao)) {
      aircraftIdByIcao.set(icao, `${aircraftID || aircraftNumber++}`)
    }

    let sbsLine =
      `${messageType || 'MSG'},` +
      `${transmissionType || '3'},` +
      `${sessionID || '1'},` +
      `${aircraftIdByIcao.get(icao)},${icao},` +
      `${flightID || aircraftIdByIcao.get(icao)},` +
      `${dateMessageGenerated},` +
      `${timeMessageGenerated},` +
      `${dateMessageLogged || dateMessageGenerated},` +
      `${timeMessageLogged || timeMessageGenerated},` +
      `${callsign || ''},` +
      `${altitude || ''},` +
      `${groundSpeed || ''},` +
      `${track || ''},` +
      `${latitude || ''},` +
      `${longitude || ''},` +
      `${verticalRate || ''},` +
      `${squawk || ''},` +
      `${toSbsBoolean(alert)},` +
      `${toSbsBoolean(emergency)},` +
      `${toSbsBoolean(spi)},` +
      `${toSbsBoolean(isOnGround)}`

    if (haveLabel !== undefined) {
      sbsLine = `${sbsLine},${toSbsBoolean(haveLabel)},${label || '0'}`
    }

    if (saveExtraField)
      sbsLine = `${sbsLine},${JSON.stringify(getExtraFields(message))}`

    sbsLines.push(sbsLine)
  }
  return sbsLines.join('\n')
}

function getExtraFields(message: JsonMessage): JsonMessage {
  const messageCopy = { ...message }
  delete messageCopy.dateMessageGenerated
  delete messageCopy.timeMessageGenerated
  delete messageCopy.dateMessageLogged
  delete messageCopy.timeMessageLogged
  delete messageCopy.hexIdent
  delete messageCopy.aircraftID
  delete messageCopy.messageType
  delete messageCopy.transmissionType
  delete messageCopy.sessionID
  delete messageCopy.flightID
  delete messageCopy.callsign
  delete messageCopy.altitude
  delete messageCopy.groundSpeed
  delete messageCopy.track
  delete messageCopy.latitude
  delete messageCopy.longitude
  delete messageCopy.verticalRate
  delete messageCopy.squawk
  delete messageCopy.alert
  delete messageCopy.emergency
  delete messageCopy.spi
  delete messageCopy.isOnGround
  delete messageCopy.haveLabel
  delete messageCopy.label
  return messageCopy
}
