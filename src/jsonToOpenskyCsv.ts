import { createObjectCsvStringifier } from 'csv-writer'
import { CsvOpenskyRow, JsonMessage, OptionsConverter } from './types'
import { getCsvOpenskyExtraFields, toCsvOpenskyBoolean } from './utils/utils'
import { mergeMessages } from './utils/mergeMessages'

export function jsonToOpenskyCsv(
  jsonContentString: string,
  options : OptionsConverter = {saveExtraField: false, mustMerge: false}
): string {
  const json = JSON.parse(jsonContentString)
  if (!Array.isArray(json)) throw new Error('JSON data must be an array')

  const messages = (options.mustMerge ? mergeMessages(json as JsonMessage[]) : json as JsonMessage[])
  const openskyCsvData = createCSVData(messages, options.saveExtraField ? options.saveExtraField : false)

  if (
    openskyCsvData.length === 0 ||
    openskyCsvData.every((item) =>
      Object.values(item).every((value) => value === '' || value === null),
    )
  ) {
    return '' // Retournez seulement l'en-tête
  } else {
    const openskyCsvStringifier = createObjectCsvStringifier({
      header: Object.keys(openskyCsvData[0]).map((header) => ({
        id: header,
        title: header,
      })),
    })

    return (
      openskyCsvStringifier.getHeaderString() +
      openskyCsvStringifier
        .stringifyRecords(openskyCsvData)
        .replace(/""/g, '"')
        .replace(/"{/g, "'{")
        .replace(/}"/g, "}'")
    ).trim()
  }
}

function createCSVData(
  messages: JsonMessage[],
  saveExtraField: boolean,
): CsvOpenskyRow[] {
  const rows: CsvOpenskyRow[] = []

  for (const message of messages) {
    if (!message.timestamp || !message.icao24) {
      console.error(
        `Timestamp or ICAO is missing for message ${JSON.stringify(message)}`,
      )
      continue
    }

    const row: CsvOpenskyRow = {
      timestamp: `${message.timestamp || ''}`,
      icao24: `${message.icao24 || ''}`,
      latitude: `${message.latitude || ''}`,
      longitude: `${message.longitude || ''}`,
      groundspeed: `${message.groundspeed || ''}`,
      track: `${message.track || ''}`,
      vertical_rate: `${message.vertical_rate || ''}`,
      callsign: `${message.callsign || ''}`,
      onground: toCsvOpenskyBoolean(message.onground),
      alert: toCsvOpenskyBoolean(message.alert),
      spi: toCsvOpenskyBoolean(message.spi),
      squawk: `${message.squawk || ''}`,
      altitude: `${message.altitude || ''}`,
      geoaltitude: `${message.geoaltitude || ''}`
    }

    if (message.last_position !== undefined) {
      row.last_position = `${message.last_position || ''}`
    }

    if (message.lastcontact !== undefined) {
      row.lastcontact = `${message.lastcontact || ''}`
    }

    if (message.hour !== undefined) {
      row.hour = `${message.hour || ''}`
    }

    if (saveExtraField)
      row.extraField = JSON.stringify(getCsvOpenskyExtraFields(message))

    rows.push(row)
  }
  return rows
}
