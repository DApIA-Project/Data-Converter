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

enum Errors {
  MISSING_ARG,
  FILE_NOT_FOUND,
  BAD_INPUT_FORMAT,
  BAD_OUTPUT_FORMAT,
}

const { file, output } = commandLineArgs([
  { name: 'file', type: String },
  { name: 'output', type: String, alias: 'o' },
])

if (!file) {
  console.error('`file` argument is missing')
  process.exit(Errors.MISSING_ARG)
}

if (!output) {
  console.error('`output` argument is missing')
  process.exit(Errors.MISSING_ARG)
}

const path = file as string
let fileContent = ''
try {
  fileContent = fs.readFileSync(path, 'utf-8')
} catch (e) {
  console.error(`Unable to read file: ${(e as any).message}`)
  process.exit(Errors.FILE_NOT_FOUND)
}

const pathSegment = path.split('.')
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
    process.exit(Errors.BAD_INPUT_FORMAT)
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
      process.exit(Errors.BAD_OUTPUT_FORMAT)
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
      process.exit(Errors.BAD_OUTPUT_FORMAT)
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
      process.exit(Errors.BAD_OUTPUT_FORMAT)
  }
}
