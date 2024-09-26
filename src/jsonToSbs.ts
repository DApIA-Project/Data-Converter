import { getSbsExtraFields, toSbsBoolean } from './utils/utils'
import { JsonMessage, OptionsConverter } from './types'
import { mergeMessages } from './utils/mergeMessages'

export function jsonToSbs(
  jsonContentString: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const json = JSON.parse(jsonContentString)
  if (!Array.isArray(json)) throw new Error('JSON data must be an array')

  const messages = (options.mustMerge ? mergeMessages(json as JsonMessage[]) : json as JsonMessage[])
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
      `${groundspeed || ''},` +
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

    if (options.saveExtraField)
      sbsLine = `${sbsLine},${JSON.stringify(getSbsExtraFields(message))}`

    sbsLines.push(sbsLine)
  }
  return sbsLines.join('\n')
}
