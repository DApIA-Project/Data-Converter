import { createObjectCsvStringifier } from 'csv-writer';
import {buildBooleanValueForCsv, buildSquawkValueForCsv, buildTimestampValue} from "./utils/utils";

/*
function getHeaders(jsonData: any[]): string[] {
    const headers = new Set<string>();
    jsonData.forEach((item) => {
        for (const key in item) {
            headers.add(key);
        }
    });
    return Array.from(headers);
}
export function convertNDJSONtoCSV(ndjsonContentString: string): string {
    let jsonContent = ndjsonContentString.split('\n').filter((line: any) => line.trim() !== '').map((line : any) => JSON.parse(line));
    const headers = getHeaders(jsonContent);
    const csvStringifier = createObjectCsvStringifier({
        header: [
            ...headers.map((header) => ({ id: header, title: header })),
        ],
    });
    const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(jsonContent);
    return csvString
}*/

function createCSVData(jsonData: any[]): any[] {
    let index = 1;
    const csvData: any[] = [];
    for (const item of jsonData) {
        let arrayErrors : string[] = []
        // Définissez ici les champs que vous voulez inclure dans le CSV
        const csvItem: { [key: string]: any } = {
            'timestamp': (buildTimestampValue(item) === 'Error' ? arrayErrors.push(`Error line ${index} : No timestamp and no date found`) : buildTimestampValue(item)),
            'icao24': (item['icao24'] === undefined || item['icao24'] === '' ? arrayErrors.push(`Error line ${index} : ICAO not found`) : item['icao24']),  // Remplacez 'source1' par le nom du champ source
            'latitude': (item['latitude'] === undefined || item['latitude'] === ''? '' : item['latitude']),  // Remplacez 'source2' par le nom du champ source
            'longitude': (item['longitude'] === undefined || item['longitude'] === ''? '' : item['longitude']),
            'groundspeed': (item['groundspeed'] === undefined || item['groundspeed'] === ''? '' : item['groundspeed']),
            'track': (item['track'] === undefined || item['track'] === ''? '' : item['track']),
            'vertical_rate': (item['vertical_rate'] === undefined || item['vertical_rate'] === ''? '' : item['vertical_rate']),
            'callsign': (item['callsign'] === undefined || item['callsign'] === ''? '' : item['callsign']),
            'onground': (buildBooleanValueForCsv(item['onground']) === 'Error' ? arrayErrors.push(`Error line ${index} : OnGround is not well-formed`) : buildBooleanValueForCsv(item['onground'])),
            'alert': (buildBooleanValueForCsv(item['alert']) === 'Error' ? arrayErrors.push(`Error line ${index} : Alert is not well-formed`) : buildBooleanValueForCsv(item['alert'])),
            'spi': (buildBooleanValueForCsv(item['spi']) === 'Error' ? arrayErrors.push(`Error line ${index} : Spi is not well-formed`) : buildBooleanValueForCsv(item['spi'])),
            'squawk': buildSquawkValueForCsv(item['squawk']),
            'altitude': (item['altitude'] === undefined || item['altitude'] === ''? '' : item['altitude']),
            'geoaltitude': (item['altitude'] === undefined || item['altitude'] === ''? '' : item['altitude']),
            'last_position':"",
            'lastcontact':"",
            'hour':"",
        };

        if(arrayErrors.length>0){
            for (const arrayError of arrayErrors) {
                console.error(arrayError)
            }
            continue
        }else{
            index++
            csvData.push(csvItem)
        }



    };

    return csvData
}

export function convertNDJSONtoCSV(ndjsonContentString: string): string {
    let jsonContent = ndjsonContentString.split('\n').filter((line: any) => line.trim() !== '').map((line : any) => JSON.parse(line));

    const csvData = createCSVData(jsonContent);

    if (csvData.length === 0 || csvData.every((item) => Object.values(item).every((value) => value === "" || value === null))) {
        const headerString = ""; // Aucune ligne à convertir, donc pas besoin de l'en-tête
        return headerString; // Retournez seulement l'en-tête
    } else {
        const csvStringifier = createObjectCsvStringifier({
            header: Object.keys(csvData[0]).map((header) => ({ id: header, title: header })),
        });

        const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(csvData);
        return csvString;
    }


}