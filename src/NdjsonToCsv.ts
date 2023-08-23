import { createObjectCsvStringifier } from 'csv-writer';


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
}