import {
  buildDateValue,
  buildSquawkValueForSbs,
  buildTimeValue,
  toSbsBoolean,
} from './utils/utils'
import { JsonMessage } from './types'

export function convertJSONtoSBS(
  array: Record<string, string>[],
  saveExtraField: boolean = false,
): string {
  let idForPlane: Map<string, number> = new Map<string, number>()
  let cptID = 1
  let sbsString: string = ''
  let index = 1
  for (const element of array) {
    let oneString: string = ''
    let arrayErrors: string[] = []
    oneString =
      (element.messageType === undefined || element.messageType === ''
        ? 'MSG'
        : element.messageType) +
      ',' +
      (element.transmissionType === undefined || element.transmissionType === ''
        ? '3'
        : element.transmissionType) +
      ',' +
      (element.sessionID === undefined || element.sessionID === ''
        ? '1'
        : element.sessionID) +
      ',' +
      (element.aircraftID === undefined || element.aircraftID === ''
        ? !idForPlane.has(element.icao24)
          ? (() => {
              idForPlane.set(element.icao24, cptID)
              cptID++
              return cptID - 1
            })()
          : idForPlane.get(element.icao24)!.toString()
        : element.aircraftID) +
      ',' +
      (element.icao24 === undefined || element.icao24 === ''
        ? arrayErrors.push(
            `Error line ${index} : No ICAO found in this message : ${sbsString}`,
          )
        : element.icao24) +
      ',' +
      (element.flightID === undefined || element.flightID === ''
        ? !idForPlane.has(element.icao24)
          ? (() => {
              idForPlane.set(element.icao24, cptID)
              cptID++
              return cptID - 1
            })()
          : idForPlane.get(element.icao24)!.toString()
        : element.flightID) +
      ',' +
      (element.dateMessageGenerated === undefined ||
      element.dateMessageGenerated === ''
        ? buildDateValue(element) === 'Error'
          ? arrayErrors.push(
              `Error line ${index} : No date is found in this message : ${sbsString}`,
            )
          : buildDateValue(element)
        : element.dateMessageGenerated) +
      ',' +
      (element.timeMessageGenerated === undefined ||
      element.timeMessageGenerated === ''
        ? buildTimeValue(element) === 'Error'
          ? arrayErrors.push(
              `Error line ${index} : No time is found in this message : ${sbsString}`,
            )
          : buildTimeValue(element)
        : element.timeMessageGenerated) +
      ',' +
      (element.dateMessageLogged === undefined ||
      element.dateMessageLogged === ''
        ? buildDateValue(element) === 'Error'
          ? arrayErrors.push(
              `Error line ${index} : No date is found in this message : ${sbsString}`,
            )
          : buildDateValue(element)
        : element.dateMessageLogged) +
      ',' +
      (element.timeMessageLogged === undefined ||
      element.timeMessageLogged === ''
        ? buildTimeValue(element) === 'Error'
          ? arrayErrors.push(
              `Error line ${index} : No time is found in this message : ${sbsString}`,
            )
          : buildTimeValue(element)
        : element.timeMessageLogged) +
      ',' +
      (element.callsign === undefined || element.callsign === ''
        ? ''
        : element.callsign) +
      ',' +
      (element.geoaltitude === undefined || element.geoaltitude === ''
        ? ''
        : element.geoaltitude) +
      ',' +
      (element.groundspeed === undefined || element.groundspeed === ''
        ? ''
        : element.groundspeed) +
      ',' +
      (element.track === undefined || element.track === ''
        ? ''
        : element.track) +
      ',' +
      (element.latitude === undefined || element.latitude === ''
        ? ''
        : element.latitude) +
      ',' +
      (element.longitude === undefined || element.longitude === ''
        ? ''
        : element.longitude) +
      ',' +
      (element.vertical_rate === undefined || element.vertical_rate === ''
        ? ''
        : element.vertical_rate) +
      ',' +
      buildSquawkValueForSbs(element.squawk) +
      ',' +
      toSbsBoolean(element.alert) +
      ',' +
      (element.emergency === undefined || element.emergency === ''
        ? '0'
        : element.emergency) +
      ',' +
      toSbsBoolean(element.spi) +
      ',' +
      toSbsBoolean(element.onground)

    if (
      element.haveLabel !== '' &&
      element.haveLabel !== undefined &&
      element.label !== '' &&
      element.label !== undefined
    ) {
      oneString = oneString + ',' + element.haveLabel + ',' + element.label
    } else {
      if (
        (element.label === '' || element.label === undefined) &&
        element.haveLabel !== '' &&
        element.haveLabel !== undefined
      ) {
        arrayErrors.push(
          `Error line ${index} : No Label is present in this message : ${sbsString}`,
        )
      }

      if (
        (element.haveLabel === '' || element.haveLabel === undefined) &&
        element.label !== '' &&
        element.label !== undefined
      ) {
        arrayErrors.push(
          `Error line ${index} : No haveLabel is present in this message : ${sbsString}`,
        )
      }
    }

    if (saveExtraField) {
      let extraField: { [key: string]: any } = {
        altitude: element.altitude,
        last_position: element.last_position,
        lastcontact: element.lastcontact,
        hour: element.hour,
      }
      oneString = oneString + ',' + JSON.stringify(extraField)
    }

    oneString = oneString + '\n'

    if (arrayErrors.length > 0) {
      for (const arrayError of arrayErrors) {
        console.error(arrayError)
      }
    } else {
      sbsString = sbsString + oneString
    }

    index++
  }
  return sbsString
}
