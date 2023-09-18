import moment from 'moment/moment'
import { JsonMessage } from '../types'

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

export function getDateToTimestamp(date: string, time: string): string {
  const timestamp = Date.parse(date + ',' + time + ' GMT')
  if (isNaN(timestamp)) {
    return 'Error content file'
  }
  const timestampInSeconds: number = Math.floor(timestamp / 1000)
  return timestampInSeconds.toString()
}

export function toSbsBoolean(str: string | undefined) {
  if (!str) return 0
  return str.toLowerCase() === 'true' || str === '1' ? 1 : 0
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

export function buildTimestampValue(item: any): string {
  if (item.timestamp !== undefined && item.timestamp !== '') {
    return item.timestamp
  } else {
    if (
      item.dateMessageGenerated !== undefined &&
      item.dateMessageGenerated !== '' &&
      item.timeMessageGenerated !== undefined &&
      item.timeMessageGenerated !== ''
    ) {
      return getDateToTimestamp(
        item.dateMessageGenerated,
        item.timeMessageGenerated,
      )
    } else {
      return 'Error'
    }
  }
}

export function buildBooleanValueForCsv(boolValue: string) {
  if (boolValue === undefined || boolValue === '') {
    return 'False'
  } else {
    if (boolValue === '1' || boolValue === '0') {
      if (boolValue === '1') {
        return 'True'
      } else {
        return 'False'
      }
    } else {
      if (boolValue === 'False' || boolValue === 'True') {
        return boolValue
      } else {
        return 'Error'
      }
    }
  }
}

export function buildSquawkValueForCsv(squawkValue: string) {
  if (
    squawkValue === '' ||
    squawkValue === 'NaN' ||
    squawkValue === undefined
  ) {
    return 'NaN'
  } else {
    return squawkValue
  }
}
