import {convertCSVtoSBS} from "../src/CsvToSbs";
import * as fs from 'fs'
import {convertSBStoCSV} from "../src/SbsToCsv";


/** CSV to SBS **/
/*
const csvFileToReadPath : string = "temp/2022_07_toulouse_DRAG66.csv"
const sbsFileToWritePath : string = "temp/2022_07_toulouse_DRAG66.sbs"
const csvData: string = fs.readFileSync(csvFileToReadPath, 'utf-8');
const sbsContent : string = convertCSVtoSBS(csvData);
fs.writeFileSync(sbsFileToWritePath, sbsContent, 'utf-8')*/

/** SBS to CSV **/

const sbsFileToReadPath : string = "temp/2022_07_toulouse_SWN5614_4m.sbs"
const csvFileToWritePath : string = "temp/2022_07_toulouse_SWN5614_4m.csv"
const sbsData: string = fs.readFileSync(sbsFileToReadPath, 'utf-8');
const csvContent : string = convertSBStoCSV(sbsData);
fs.writeFileSync(csvFileToWritePath, csvContent, 'utf-8')