import {convertCSVtoSBS} from "../src/CsvToSbs";
import * as fs from 'fs'
import {convertSBStoCSV} from "../src/SbsToCsv";

/** CSV to SBS **/
/*
const csvFileToReadPath : string = "temp/2022_07_toulouse_DRAG66_label.csv"
const sbsFileToWritePath : string = "temp/2022_07_toulouse_DRAG66_label_extra.sbs"
const csvData: string = fs.readFileSync(csvFileToReadPath, 'utf-8');
const sbsContent : string = convertCSVtoSBS(csvData);
fs.writeFileSync(sbsFileToWritePath, sbsContent, 'utf-8')*/

/** SBS to CSV **/
/*
const sbsFileToReadPath : string = "temp/2022_07_toulouse_DRAG66_label.sbs"
const csvFileToWritePath : string = "temp/2022_07_toulouse_DRAG66_label.csv"
const sbsData: string = fs.readFileSync(sbsFileToReadPath, 'utf-8');
const csvContent : string = convertSBStoCSV(sbsData,true);
fs.writeFileSync(csvFileToWritePath, csvContent, 'utf-8')*/

