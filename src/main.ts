import * as fs from 'fs'
import { csvToJson } from './csvToJson'
import { jsonToSbs } from './jsonToSbs'
import commandLineArgs from 'command-line-args'
import { jsonToCsv } from './jsonToCsv'
import { ndjsonToSbs } from './ndjsonToSbs'
import { ndjsonToCsv } from './ndjsonToCsv'
import { csvToNdjson } from './csvToNdjson'
import { csvToSbs } from './csvToSbs'
import { sbsToNdjson } from './sbsToNdjson'
import { sbsToJson } from './sbsToJson'
import { sbsToCsv } from './sbsToCsv'

const { file, output } = commandLineArgs([
  { name: 'file', type: String },
  { name: 'output', type: String, alias: 'o' },
])

if (!file) {
  console.error('`file` argument is missing')
  process.exit(1)
}

if (!output) {
  console.error('`output` argument is missing')
  process.exit(1)
}

const path = file as string
const fileContent = fs.readFileSync(path, 'utf-8')

let pathSegment = path.split('.')
const extension = pathSegment.slice(-1)[0] || ''
const fileName = pathSegment.slice(0, -1).join('.')

let outputFileContent = ''
switch (extension.toLowerCase()) {
  case 'json':
    outputFileContent = convertJson(fileContent, output)
    break
  case 'ndjson':
    outputFileContent = convertNdjson(fileContent, output)
    break
  case 'csv':
    outputFileContent = convertCsv(fileContent, output)
    break
  case 'sbs':
    outputFileContent = convertSbs(fileContent, output)
    break
  default:
    console.error(
      'Unknown extension: `.json`, `.ndjson`, `.csv` and `.sbs` are allowed',
    )
    process.exit(2)
}
fs.writeFileSync(
  `${fileName}.${(output as string).toLowerCase()}`,
  outputFileContent,
)
process.exit(0)

function convertJson(fileContent: string, output: string): string {
  switch (output.toLowerCase()) {
    case 'csv':
      return jsonToCsv(fileContent, true)
    case 'sbs':
      return jsonToSbs(fileContent, true)
    default:
      console.error('JSON can only be converted to CSV or SBS')
      process.exit(3)
  }
}

function convertNdjson(fileContent: string, output: string): string {
  switch (output.toLowerCase()) {
    case 'csv':
      return ndjsonToCsv(fileContent, true)
    case 'sbs':
      return ndjsonToSbs(fileContent, true)
    default:
      console.error('NDJSON can only be converted to CSV or SBS')
      process.exit(3)
  }
}

function convertCsv(fileContent: string, output: string): string {
  switch (output.toLowerCase()) {
    case 'ndjson':
      return csvToNdjson(fileContent, true)
    case 'json':
      return JSON.stringify(csvToJson(fileContent, true))
    case 'sbs':
      return csvToSbs(fileContent)
    default:
      console.error('CSV can only be converted to JSON, NDJSON or SBS')
      process.exit(3)
  }
}

function convertSbs(fileContent: string, output: string): string {
  switch (output.toLowerCase()) {
    case 'ndjson':
      return sbsToNdjson(fileContent, true)
    case 'json':
      return JSON.stringify(sbsToJson(fileContent, true))
    case 'csv':
      return sbsToCsv(fileContent)
    default:
      console.error('SBS can only be converted to JSON, NDJSON or CSV')
      process.exit(3)
  }
}
