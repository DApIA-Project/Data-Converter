import {convertCSVtoSBS} from "./src/CsvToSbs";
import * as fs from 'fs'


/** CSV to SBS **/
const fileToReadPath : string = "temp/SAMU13_1672575671.csv"
const fileToWritePath : string = "temp/SAMU13.sbs"
const csvData: string = fs.readFileSync(fileToReadPath, 'utf-8');
const sbsContent : string = convertCSVtoSBS(csvData);
fs.writeFileSync(fileToWritePath, sbsContent, 'utf-8')

/** SBS to CSV **/