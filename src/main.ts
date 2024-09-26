#!/usr/bin/env node
import * as fs from 'fs'
import { openskyCsvToJson } from './openskyCsvToJson'
import { jsonToSbs } from './jsonToSbs'
import commandLineArgs from 'command-line-args'
import { jsonToOpenskyCsv } from './jsonToOpenskyCsv'
import { ndjsonToSbs } from './ndjsonToSbs'
import { ndjsonToOpenskyCsv } from './ndjsonToOpenskyCsv'
import { openskyCsvToNdjson } from './openskyCsvToNdjson'
import { openskyCsvToSbs } from './openskyCsvToSbs'
import { sbsToNdjson } from './sbsToNdjson'
import { sbsToJson } from './sbsToJson'
import { sbsToOpenskyCsv } from './sbsToOpenskyCsv'
import {getDataType} from "./utils/utils";
import {droneCsvToSbs} from "./droneCsvToSbs";
import {droneCsvToJson} from "./droneCsvToJson";
import {droneCsvToNdjson} from "./droneCsvToNdjson";
import {droneCsvToOpenskyCsv} from "./droneCsvToOpenskyCsv";
import {sbsToDroneCsv} from "./sbsToDroneCsv";
import {ndjsonToDroneCsv} from "./ndjsonToDroneCsv";
import {jsonToDroneCsv} from "./jsonToDroneCsv";
import {openskyCsvToDroneCsv} from "./openskyCsvToDroneCsv";

enum Errors {
  MISSING_ARG,
  FILE_NOT_FOUND,
  BAD_INPUT_FORMAT,
  BAD_OUTPUT_FORMAT,
}

const { file, output, fusion } = commandLineArgs([
  { name: 'file', type: String },
  { name: 'output', type: String, alias: 'o' },
  { name: 'fusion', type: Boolean, defaultValue: false},
])

const mustMerge : boolean = fusion

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

/** Récupérer extension fichier de sortie (doit être .csv .sbs .json .ndjson ou .drone.csv) **/
const pathSegmentsOutput = output.split('.');
let extensionOutput = pathSegmentsOutput.slice(-1)[0] || '';
let fileNameOutput: string;
if (pathSegmentsOutput.length > 2 && pathSegmentsOutput[pathSegmentsOutput.length - 2] === 'drone') {
  fileNameOutput = pathSegmentsOutput.slice(0, -2).join('.');
  extensionOutput = 'drone.' + extensionOutput;
} else {
  fileNameOutput = pathSegmentsOutput.slice(0, -1).join('.');
}

let outputFileContent = ''
switch (extension.toLowerCase()) {
  case 'json':
    outputFileContent = convertJson(fileContent, extensionOutput, mustMerge)
    break
  case 'ndjson':
    outputFileContent = convertNdjson(fileContent, extensionOutput, mustMerge)
    break
  case 'csv':
    outputFileContent = convertCsv(fileContent, extensionOutput, mustMerge)
    break
  case 'sbs':
    outputFileContent = convertSbs(fileContent, extensionOutput, mustMerge)
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

function convertJson(fileContent: string, output: string, mustMerge: boolean): string {
  switch (output.toLowerCase()) {
    case 'csv':
      return jsonToOpenskyCsv(fileContent, {saveExtraField: true, mustMerge})
    case 'sbs':
      return jsonToSbs(fileContent, {saveExtraField: true, mustMerge})
    case 'drone.csv':
      return jsonToDroneCsv(fileContent,{saveExtraField: true, mustMerge})
    default:
      console.error('JSON can only be converted to CSV or SBS')
      process.exit(3)
  }
}

function convertNdjson(fileContent: string, output: string, mustMerge: boolean): string {
  switch (output.toLowerCase()) {
    case 'csv':
      return ndjsonToOpenskyCsv(fileContent, {saveExtraField: true, mustMerge})
    case 'sbs':
      return ndjsonToSbs(fileContent, {saveExtraField: true, mustMerge})
    case 'drone.csv':
      return ndjsonToDroneCsv(fileContent,{saveExtraField: true, mustMerge})
    default:
      console.error('NDJSON can only be converted to CSV or SBS')
      process.exit(Errors.BAD_OUTPUT_FORMAT)
  }
}

function convertCsv(fileContent: string, output: string, mustMerge: boolean): string {
  let dataType : string = getDataType(fileContent)
  switch (output.toLowerCase()) {
    case 'ndjson':
      if(dataType==='drone'){
        return droneCsvToNdjson(fileContent, {saveExtraField: true, mustMerge})
      }else{
        return openskyCsvToNdjson(fileContent, {saveExtraField: true, mustMerge})
      }

    case 'json':
      if(dataType==='drone'){
        return JSON.stringify(droneCsvToJson(fileContent, {mustMerge}))
      }else{
        return JSON.stringify(openskyCsvToJson(fileContent,{saveExtraField: true, mustMerge}))
      }
    case 'sbs':

        if(dataType==='drone'){
          return droneCsvToSbs(fileContent, {mustMerge})
        }else{
          return openskyCsvToSbs(fileContent, {mustMerge})
        }
    case 'csv':
      if(dataType==='drone'){
        return droneCsvToOpenskyCsv(fileContent, {mustMerge})
      }else{
        console.error('CSV can\'t be converted to CSV')
        process.exit(Errors.BAD_OUTPUT_FORMAT)
      }
    case 'drone.csv':
      if(dataType !=='drone'){
        return openskyCsvToDroneCsv(fileContent, {mustMerge})
      }else{
        console.error('CSV Drone can\'t be converted to CSV Drone')
        process.exit(Errors.BAD_OUTPUT_FORMAT)
      }
    default:
      console.error('CSV can only be converted to JSON, NDJSON or SBS or CSV Drone')
      process.exit(Errors.BAD_OUTPUT_FORMAT)
  }
}

function convertSbs(fileContent: string, output: string, mustMerge: boolean): string {
  switch (output.toLowerCase()) {
    case 'ndjson':
      return sbsToNdjson(fileContent, {saveExtraField: true, mustMerge})
    case 'json':
      return JSON.stringify(sbsToJson(fileContent, {saveExtraField: true, mustMerge}))
    case 'csv':
      return sbsToOpenskyCsv(fileContent, {saveExtraField: true, mustMerge})
    case 'drone.csv':
      return sbsToDroneCsv(fileContent,{saveExtraField: true, mustMerge})
    default:
      console.error('SBS can only be converted to JSON, NDJSON or CSV')
      process.exit(Errors.BAD_OUTPUT_FORMAT)
  }
}
