// import SBS to CSV converter
import {convertSBStoCSV} from './SbsToCsv'
import * as fs from 'fs'

const sbsFileToReadPath : string = "temp/2022_07_toulouse_SAMUCF_1h.sbs"
const csvFileToWritePath : string = "temp/2022_07_toulouse_SAMUCF_1h.csv"
const sbsData: string = fs.readFileSync(sbsFileToReadPath, 'utf-8');
const csvData : string = convertSBStoCSV(sbsData,false);
fs.writeFileSync(csvFileToWritePath, csvData, 'utf-8')