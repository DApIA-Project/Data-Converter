import * as fs from "fs";
import { csvToJson } from "../src/CsvToJson";
import { jsonToSbs } from "../src/JsonToSbs"; /** CSV to SBS **/

/** CSV to SBS **/
/*
const csvFileToReadPath : string = "temp/2022_07_toulouse_DRAG66_label.csv"
const sbsFileToWritePath : string = "temp/2022_07_toulouse_DRAG66_label_extra.sbs"
const csvData: string = fs.readFileSync(csvFileToReadPath, 'utf-8');
const sbsContent : string = convertCSVtoSBS(csvData);
fs.writeFileSync(sbsFileToWritePath, sbsContent, 'utf-8')*/

/** SBS to CSV **/
/*
const sbsFileToReadPath : string = "temp/2022_07_toulouse_DRAG66.sbs"
const csvFileToWritePath : string = "temp/2022_07_toulouse_DRAG66.csv"
const sbsData: string = fs.readFileSync(sbsFileToReadPath, 'utf-8');
const csvContent : string = convertSBStoCSV(sbsData);
fs.writeFileSync(csvFileToWritePath, csvContent, 'utf-8')
*/
/** SBS to JSON **/
/*
const sbsFileToReadPath : string = "temp/2022_07_toulouse_SAMUCF_1h.sbs"
const jsonFileToWritePath : string = "temp/2022_07_toulouse_SAMUCF_1h.json"
const sbsData: string = fs.readFileSync(sbsFileToReadPath, 'utf-8');
const jsonContent : string = convertSBStoJSON(sbsData);
fs.writeFileSync(jsonFileToWritePath, jsonContent, 'utf-8')*/

/** SBS to NDJSON **/
/*
const sbsFileToReadPath : string = "temp/2022_07_toulouse_SAMUCF_1h.sbs"
const ndjsonFileToWritePath : string = "temp/2022_07_toulouse_SAMUCF_1h.ndjson"
const sbsData: string = fs.readFileSync(sbsFileToReadPath, 'utf-8');
const ndjsonContent : string = convertSBStoNDJSON(sbsData);
fs.writeFileSync(ndjsonFileToWritePath, ndjsonContent, 'utf-8')*/

/** CSV to JSON **/
/*
const csvFileToReadPath : string = "temp/2022_07_toulouse_DRAG66.csv"
const jsonFileToWritePath : string = "temp/2022_07_toulouse_DRAG66.json"
const csvData: string = fs.readFileSync(csvFileToReadPath, 'utf-8');
const jsonContent : string = convertCSVtoJSON(csvData);
fs.writeFileSync(jsonFileToWritePath, jsonContent, 'utf-8')*/

/** CSV to NDJSON **/
/*
const csvFileToReadPath : string = "temp/2022_07_toulouse_DRAG66.csv"
const ndjsonFileToWritePath : string = "temp/2022_07_toulouse_DRAG66.ndjson"
const csvData: string = fs.readFileSync(csvFileToReadPath, 'utf-8');
const ndjsonContent : string = convertCSVtoNDJSON(csvData);
fs.writeFileSync(ndjsonFileToWritePath, ndjsonContent, 'utf-8')
*/

/** JSON to CSV **/
/*
const jsonFileToReadPath : string = "temp/2022_07_toulouse_DRAG66.json"
const csvFileToWritePath : string = "temp/2022_07_toulouse_DRAG66_fromJSON.csv"
const jsonData: string = fs.readFileSync(jsonFileToReadPath, 'utf-8');
const csvContent : string = convertJSONtoCSV(jsonData);
fs.writeFileSync(csvFileToWritePath, csvContent, 'utf-8')
*/

/** NDJSON to CSV **/
/*
const ndjsonFileToReadPath : string = "temp/2022_07_toulouse_DRAG66.ndjson"
const csvFileToWritePath : string = "temp/2022_07_toulouse_DRAG66_fromNDJSON.csv"
const ndjsonData: string = fs.readFileSync(ndjsonFileToReadPath, 'utf-8');
const csvContent : string = convertNDJSONtoCSV(ndjsonData);
fs.writeFileSync(csvFileToWritePath, csvContent, 'utf-8')
*/

/** JSON to SBS **/
/*
const jsonFileToReadPath : string = "temp/2022_07_toulouse_SAMUCF_1h.json"
const sbsFileToWritePath : string = "temp/2022_07_toulouse_SAMUCF_1h_fromJSON.sbs"
const jsonData: string = fs.readFileSync(jsonFileToReadPath, 'utf-8');
const sbsContent : string = convertJSONtoSBS(jsonData);
fs.writeFileSync(sbsFileToWritePath, sbsContent, 'utf-8')
*/

/** NDJSON to SBS **/
/*
const ndjsonFileToReadPath : string = "temp/2022_07_toulouse_SAMUCF_1h.ndjson"
const sbsFileToWritePath : string = "temp/2022_07_toulouse_SAMUCF_1h_fromNDJSON.sbs"
const ndjsonData: string = fs.readFileSync(ndjsonFileToReadPath, 'utf-8');
const sbsContent : string = convertNDJSONtoSBS(ndjsonData);
fs.writeFileSync(sbsFileToWritePath, sbsContent, 'utf-8')*/

/** CSV to JSON to SBS **/

const csvFileToReadPath: string = 'temp/2022_07_toulouse_SWN5614_4m.csv'
const sbsFileToWritePath: string =
  'temp/2022_07_toulouse_SWN5614_4m_FromCsvToJson.sbs'
const csvData: string = fs.readFileSync(csvFileToReadPath, 'utf-8')

const json = csvToJson(csvData)
console.log(json)
const sbsContent: string = jsonToSbs(JSON.stringify(json))
fs.writeFileSync(sbsFileToWritePath, sbsContent, 'utf-8')
