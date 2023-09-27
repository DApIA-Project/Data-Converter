import { createObjectCsvStringifier } from 'csv-writer'
import { CsvRow, JsonMessage } from './types'
import { getCsvExtraFields, toCsvBoolean } from './utils/utils'

export function jsonToCsv(
  jsonContentString: string,
  saveExtraField: boolean = false,
): string {
  const json = JSON.parse(jsonContentString)
  if (!Array.isArray(json)) throw new Error('JSON data must be an array')

  const messages = json as JsonMessage[]
  const csvData = createCSVData(messages, saveExtraField)

  if (
    csvData.length === 0 ||
    csvData.every((item) =>
      Object.values(item).every((value) => value === '' || value === null),
    )
  ) {
    return '' // Retournez seulement l'en-tête
  } else {
    const csvStringifier = createObjectCsvStringifier({
      header: Object.keys(csvData[0]).map((header) => ({
        id: header,
        title: header,
      })),
    })

    return (
      csvStringifier.getHeaderString() +
      csvStringifier
        .stringifyRecords(csvData)
        .replace(/""/g, '"')
        .replace(/"{/g, "'{")
        .replace(/}"/g, "}'")
    ).trim()
  }
}

function createCSVData(
  messages: JsonMessage[],
  saveExtraField: boolean,
): CsvRow[] {
  const rows: CsvRow[] = []

  for (const message of messages) {
    if (!message.timestamp || !message.icao24) {
      console.error(
        `Timestamp or ICAO is missing for message ${JSON.stringify(message)}`,
      )
      continue
    }

    const row: CsvRow = {
      timestamp: `${message.timestamp || ''}`,
      icao24: `${message.icao24 || ''}`,
      latitude: `${message.latitude || ''}`,
      longitude: `${message.longitude || ''}`,
      groundspeed: `${message.groundspeed || ''}`,
      track: `${message.track || ''}`,
      vertical_rate: `${message.vertical_rate || ''}`,
      callsign: `${message.callsign || ''}`,
      onground: toCsvBoolean(message.onground),
      alert: toCsvBoolean(message.alert),
      spi: toCsvBoolean(message.spi),
      squawk: `${message.squawk || ''}`,
      altitude: `${message.altitude || ''}`,
      geoaltitude: `${message.geoaltitude || ''}`,
      last_position: `${message.last_position || ''}`,
      lastcontact: `${message.lastcontact || ''}`,
      hour: `${message.hour || ''}`,
    }

    if (saveExtraField)
      row.extraField = JSON.stringify(getCsvExtraFields(message))

    rows.push(row)
  }
  return rows
}
