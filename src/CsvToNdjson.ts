import {parse} from "csv-parse/sync"

export function convertCSVtoNDJSON(csvContent: string): string {
    const linesObject = parse(csvContent, {columns: true, quote : "'" })
    const jsonContent: string[] = [];
    for (const lineObject of linesObject) {
        if (lineObject.timestamp && !isNaN(parseInt(lineObject.timestamp))) {
            const extraField = lineObject.extraField ? JSON.parse(lineObject.extraField.replace(/([a-zA-Z0-9_]+)(\s*)/g, '"$1"$2')) : {};
            delete lineObject.extraField;

            // Fusionnez les données de la ligne et du champ "extraField"
            const mergedObject = { ...lineObject, ...extraField };
            jsonContent.push(JSON.stringify(mergedObject));
        }

    }
    let ndjsonString = jsonContent.join('\n');

    return ndjsonString
}