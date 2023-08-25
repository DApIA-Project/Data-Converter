import {parse} from "csv-parse/sync"
import {isTimestampValid} from "./utils/utils";

export function convertCSVtoJSON(csvContent: string): string {
    const linesObject = parse(csvContent, {columns: true, quote : "'" })
    let jsonContent : {}[] = []
    for (const lineObject of linesObject) {
        if (lineObject.timestamp && !isNaN(parseInt(lineObject.timestamp))) {
            jsonContent.push(lineObject)
        }

    }
    return JSON.stringify(jsonContent)
}