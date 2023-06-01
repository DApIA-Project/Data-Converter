import {convertCSVtoSBS} from "./src/CsvToSbs";
import * as fs from 'fs'
import {convertSBStoCSV} from "./src/SbsToCsv";


/** CSV to SBS **/
const csvFileToReadPath : string = "temp/SAMU13_1672575671.csv"
const sbsFileToWritePath : string = "temp/SAMU13.sbs"
const csvData: string = fs.readFileSync(csvFileToReadPath, 'utf-8');
const sbsContent : string = convertCSVtoSBS(csvData);
fs.writeFileSync(sbsFileToWritePath, sbsContent, 'utf-8')

/** SBS to CSV **/

const sbsFileToReadPath : string = "temp/SAMU13.sbs"
const csvFileToWritePath : string = "temp/SAMU13_csv.csv"
const sbsData: string = fs.readFileSync(sbsFileToReadPath, 'utf-8');
const csvContent : string = convertSBStoCSV(sbsData);
fs.writeFileSync(csvFileToWritePath, csvContent, 'utf-8')