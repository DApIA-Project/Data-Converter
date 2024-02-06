#!/usr/bin/env node
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
import {getDataType} from "./utils/utils";
import {droneCsvToSbs} from "./droneCsvToSbs";
import {droneCsvToJson} from "./droneCsvToJson";
import {droneCsvToNdjson} from "./droneCsvToNdjson";
import {droneCsvToCsv} from "./droneCsvToCsv";

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


const pathSegmentOutput = output.split('.')
const extensionOutput = pathSegmentOutput.slice(-1)[0] || ''
const fileNameOutput = pathSegmentOutput.slice(0, -1).join('.')

let outputFileContent = ''
switch (extension.toLowerCase()) {
  case 'json':
    outputFileContent = convertJson(fileContent, extensionOutput)
    break
  case 'ndjson':
    outputFileContent = convertNdjson(fileContent, extensionOutput)
    break
  case 'csv':
    outputFileContent = convertCsv(fileContent, extensionOutput)
    break
  case 'sbs':
    outputFileContent = convertSbs(fileContent, extensionOutput)
    break
  default:
    console.error(
      'Unknown extension: `.json`, `.ndjson`, `.csv` and `.sbs` are allowed',
    )
    process.exit(Errors.BAD_INPUT_FORMAT)
}
fs.writeFileSync(
  `${fileNameOutput}.${(extensionOutput as string).toLowerCase()}`,
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
  let dataType : string = getDataType(fileContent)
  switch (output.toLowerCase()) {
    case 'ndjson':
      if(dataType==='drone'){
        return droneCsvToNdjson(fileContent, true)
      }else{
        return csvToNdjson(fileContent, true)
      }

    case 'json':
      if(dataType==='drone'){
        return JSON.stringify(droneCsvToJson(fileContent))
      }else{
        return JSON.stringify(csvToJson(fileContent, true))
      }
    case 'sbs':

        if(dataType==='drone'){
          return droneCsvToSbs(fileContent)
        }else{
          return csvToSbs(fileContent)
        }
    case 'csv':
      if(dataType==='drone'){
        return droneCsvToCsv(fileContent)
      }else{
        console.error('CSV can\'t be converted to CSV')
        process.exit(Errors.BAD_OUTPUT_FORMAT)
      }
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
      return sbsToCsv(fileContent,true)
    default:
      console.error('SBS can only be converted to JSON, NDJSON or CSV')
      process.exit(Errors.BAD_OUTPUT_FORMAT)
  }
}
