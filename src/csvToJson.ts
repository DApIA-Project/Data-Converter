import { parse } from 'csv-parse/sync'
import moment from 'moment/moment'
import { JsonMessage } from './types'

export function csvToJson(
  csvContent: string,
  saveExtraField: boolean = false,
): JsonMessage[] {
  const lines = parse(csvContent, { columns: true, quote: "'" })
  const jsonLines: JsonMessage[] = []
  for (const line of lines) {
    if (!moment.utc(parseInt(line.timestamp || '')).isValid()) continue

    let extraField: JsonMessage = {}
    if (saveExtraField) {
      try {
        extraField = {
          ...JSON.parse(
            line.extraField.replace(/([a-zA-Z0-9_]+)(\s*)/g, '"$1"$2'),
          ),
        }
      } catch (ignored) {}
    }
    let jsonLine = { ...line, ...extraField }
    delete jsonLine.extraField
    jsonLines.push(jsonLine)
  }
  return jsonLines
}
