import {parse} from "csv-parse/sync"

export function convertCSVtoJSON(csvContent: string): string {
    const linesObject = parse(csvContent, {columns: true, quote : "'" })
    let jsonContent : {}[] = []
    for (const lineObject of linesObject) {
        if (lineObject.timestamp && !isNaN(parseInt(lineObject.timestamp))) {
            const extraField = lineObject.extraField ? JSON.parse(lineObject.extraField.replace(/([a-zA-Z0-9_]+)(\s*)/g, '"$1"$2')) : {};
            delete lineObject.extraField;

            // Fusionnez les données de la ligne et du champ "extraField"
            const mergedObject = { ...lineObject, ...extraField };
            jsonContent.push(mergedObject);
        }


    }
    return JSON.stringify(jsonContent)
}