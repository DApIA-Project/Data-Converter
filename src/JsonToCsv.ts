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
export function convertJSONtoCSV(jsonContentString: string): string {
    let jsonContent = JSON.parse(jsonContentString);
    const headers = getHeaders(jsonContent);
    const csvStringifier = createObjectCsvStringifier({
        header: [
            ...headers.map((header) => ({ id: header, title: header })),
        ],
    });



    const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(jsonContent);
    return csvString

}