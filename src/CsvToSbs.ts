export{}
function getTimestampToDate(timestamp : string) : string{
    const date = new Date(parseInt(timestamp) * 1000)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = ""+year+"/"+month+"/"+day
    return formattedDate
}

function  getTimestampToTime(timestamp : string) : string{
    const date = new Date(parseInt(timestamp) * 1000)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    const formattedTime = ""+hours+":"+minutes+":"+seconds+"."+milliseconds
    return formattedTime
}

export function convertCSVtoSBS(csvContent : string) : string{
    const csvRows : string[] = csvContent.split('\n');
    const columnNames : string[] = csvRows[0].split(',');
    csvRows.shift();

    const sbsRows : string[] = [];
    let idForPlane : Map<string, number> = new Map<string,number>();
    let cptID = 1;
    for (const csvRow of csvRows) {
        const csvValues: string[] = csvRow.split(',');
        const sbsValues : string[] = [];


        /** Valeurs par défaut**/
        sbsValues[0] = "MSG"
        sbsValues[1] = "3"
        sbsValues[2] = "1"
        if(!idForPlane.has(csvValues[1])){
            sbsValues[3] = cptID.toString()
            sbsValues[5] = cptID.toString()
            idForPlane.set(csvValues[1],cptID)
            cptID++
        }else{
            sbsValues[3] = (idForPlane.get(csvValues[1]))!.toString()
            sbsValues[5] = (idForPlane.get(csvValues[1]))!.toString()
        }
        sbsValues[19] = "0"


        /** Champs csv **/
        for (const champ of columnNames) {
            switch (champ){
                case "time":

                    sbsValues[6] = getTimestampToDate(csvValues[0])
                    sbsValues[7] = getTimestampToTime(csvValues[0])
                    sbsValues[8] = getTimestampToDate(csvValues[0])
                    sbsValues[9] = getTimestampToTime(csvValues[0])

                    break
                case "icao24":
                    sbsValues[4] = csvValues[1]
                    break
                case "lat":
                    sbsValues[14] = csvValues[2]
                    break
                case "lon":
                    sbsValues[15] = csvValues[3]
                    break
                case "velocity":
                    sbsValues[12] = csvValues[4]
                    break
                case "heading":
                    sbsValues[13] = csvValues[5]
                    break
                case "track":
                    sbsValues[13] = csvValues[5]
                    break
                case "vertrate":
                    sbsValues[16] = csvValues[6]
                    break
                case "callsign":
                    sbsValues[10] = csvValues[7]
                    break
                case "onground":
                    if(csvValues[8] === "TRUE"){
                        sbsValues[21] = "1"
                    }else{
                        sbsValues[21] = "0"
                    }
                    break
                case "alert":
                    if(csvValues[9] === "TRUE"){
                        sbsValues[18] = "1"
                    }else{
                        sbsValues[18] = "0"
                    }
                    break
                case "spi":
                    if(csvValues[10] === "TRUE"){
                        sbsValues[20] = "1"
                    }else{
                        sbsValues[20] = "0"
                    }
                    break
                case "squawk":
                    if(csvValues[11] === "NaN" || csvValues[11] === ""){
                        sbsValues[17] = ""
                    }else{
                        sbsValues[17] = csvValues[11]
                    }
                    break
                case "baroaltitude":
                    sbsValues.push(csvValues[12])
                    break
                case "geoaltitude":
                    sbsValues[11] = csvValues[13]
                    break
                case "lastposupdate":
                    sbsValues.push(csvValues[14])
                    break
                case "lastcontact":
                    sbsValues.push(csvValues[15])
                    break
                case "hour":
                    sbsValues.push(csvValues[16])
                    break
            }

        }

        let oneRow : string = sbsValues.join(',')
        sbsRows.push(oneRow);

    }

    let sbsContent : string = sbsRows.join('\n')
    return sbsContent


}
