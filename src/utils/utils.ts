import moment from 'moment/moment'

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

export function toSbsBoolean(value: boolean | string | number | undefined) {
  if (value === undefined) return ''

  if (typeof value === 'boolean') return value ? '1' : '0'

  if (typeof value === 'number') return value <= 0 ? '0' : '1'

  if (!value) return ''

  return value.toLowerCase() === 'true' || value === '1' ? '1' : '0'
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
