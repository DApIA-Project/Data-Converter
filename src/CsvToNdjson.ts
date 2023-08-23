import {parse} from "csv-parse/sync"

export function convertCSVtoNDJSON(csvContent: string): string {
    const linesObject = parse(csvContent, {columns: true, quote : "'" })
    const jsonContent: string[] = [];
    for (const lineObject of linesObject) {
        jsonContent.push(JSON.stringify(lineObject));
    }
    let ndjsonString = jsonContent.join('\n');

    return ndjsonString
}