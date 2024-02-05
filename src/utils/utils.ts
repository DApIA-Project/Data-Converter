import moment from 'moment/moment'
import {JsonMessage} from '../types'
import {parse} from 'csv-parse/sync'

export const SBS_DATE_FORMAT = 'YYYY/MM/DD'
export const SBS_TIME_FORMAT = 'HH:mm:ss.SSS'

export function toSbsDate(str: string | undefined): string {
  const date = moment.utc(parseInt(str || '') * 1000)
  if (!date.isValid()) throw new Error('Invalid Date')
  return date.utc().format(SBS_DATE_FORMAT)
}

export function toSbsTime(str: string | undefined): string {
  const date = moment.utc(parseInt(str || '') * 1000)
  if (!date.isValid()) throw new Error('Invalid Date')
  return date.utc().format(SBS_TIME_FORMAT)
}

export function toSbsBoolean(value: boolean | string | number | undefined) {
  if (value === undefined) return ''

  if (typeof value === 'boolean') return value ? '1' : '0'

  if (typeof value === 'number') return value <= 0 ? '0' : '1'

  if (!value) return ''

  return value.toLowerCase() === 'true' || value === '1' ? '1' : '0'
}

export function toCsvBoolean(value: boolean | string | number | undefined) {
  const sbsBoolean = toSbsBoolean(value)
  if (sbsBoolean === '') return sbsBoolean
  return sbsBoolean === '1' ? 'True' : 'False'
}

export function fromSbsBoolean(value: boolean | string | number | undefined) {
  if (value === undefined || value === '') return
  return value === '1'
}

export function cleanEmptyProperties(object: Record<string, any>) {
  Object.keys(object).forEach(
    (key) =>
      (object[key] === undefined || object[key] === '') && delete object[key],
  )
}

export function buildDateValue(jsonContentElement: any) {
  if (jsonContentElement.timestamp != undefined) {
    return toSbsDate(jsonContentElement.timestamp)
  } else {
    return 'Error'
  }
}

export function buildTimeValue(jsonContentElement: any) {
  if (jsonContentElement.timestamp != undefined) {
    return toSbsTime(jsonContentElement.timestamp)
  } else {
    return 'Error'
  }
}

export function buildSquawkValueForSbs(squawkValue: string) {
  if (
    squawkValue === '' ||
    squawkValue === 'NaN' ||
    squawkValue === undefined
  ) {
    return ''
  } else {
    return squawkValue
  }
}

export function toCsvTimestamp(date: string, time: string): number {
  const timestamp = Date.parse(date + ',' + time + ' GMT')
  if (isNaN(timestamp)) throw new Error('Invalid date')
  return Math.floor(timestamp / 1000)
}

export function getCsvExtraFields(message: JsonMessage): JsonMessage {
  const messageCopy = { ...message }
  delete messageCopy.timestamp
  delete messageCopy.icao24
  delete messageCopy.latitude
  delete messageCopy.longitude
  delete messageCopy.groundspeed
  delete messageCopy.track
  delete messageCopy.vertical_rate
  delete messageCopy.callsign
  delete messageCopy.onground
  delete messageCopy.alert
  delete messageCopy.spi
  delete messageCopy.squawk
  delete messageCopy.altitude
  delete messageCopy.geoaltitude
  delete messageCopy.last_position
  delete messageCopy.lastcontact
  delete messageCopy.hour
  return messageCopy
}

export function getSbsExtraFields(message: JsonMessage): JsonMessage {
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


export function getDataType(csvContent : string) : string{
  csvContent=csvContent.replace(/\n\s*$/, '')
  csvContent=csvContent.replace(/,/g, '.')
  csvContent=csvContent.replace(/;/g, ',')
  const lines = parse(csvContent, { columns: true})
  const header = Object.keys(lines[0])
  if(header.includes('name')){
    return 'drone'
  }else{
    return 'opensky'
  }
}


export function getDateFromDroneToSbs(date : string | undefined) : string{
  const dateTime = new Date(date || '')
  const year = dateTime.getFullYear()
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
  const day = dateTime.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`;
}

export function getTimeFromDroneToSbs(date : string | undefined) : string{
  const dateTime = new Date(date || '')
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');
  const milliseconds = dateTime.getMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`
}