export function getTimestampToDate(timestamp: string): string {
    const date = new Date(parseInt(timestamp) * 1000)
    if (date.toString() === "Invalid Date") {
        return "Error content file"
    }
    const year = date.getUTCFullYear()
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = date.getUTCDate().toString().padStart(2, '0');
    const formattedDate = "" + year + "/" + month + "/" + day
    return formattedDate
}

export function getTimestampToTime(timestamp: string): string {
    const date = new Date(parseInt(timestamp) * 1000)
    if (date.toString() === "Invalid Date") {
        return "Error content file"
    }
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    const formattedTime = "" + hours + ":" + minutes + ":" + seconds + "." + milliseconds
    return formattedTime
}

export function getDateToTimestamp(date : string, time : string) : string {

    const timestamp = Date.parse(date + ',' + time + ' GMT')
    if(isNaN(timestamp)){
        return "Error content file"
    }
    const timestampInSeconds : number = Math.floor(timestamp / 1000);
    return timestampInSeconds.toString()

}

export function buildBooleanValueForSbs(boolValue : string){
    if(boolValue === undefined || boolValue === ''){
        return '0'
    }else{
        if(boolValue === 'True' || boolValue === 'False'){
            if(boolValue === 'True'){
                return '1'
            }else{
                return '0'
            }
        }else{
            if(boolValue === '0' || boolValue === '1'){
                return boolValue
            }else{
                return 'Error'
            }
        }
    }
}

export function buildDateValue(jsonContentElement : any){
    if(jsonContentElement.timestamp != undefined){
        return getTimestampToDate(jsonContentElement.timestamp)
    }else{
        return "Error"
    }
}

export function buildTimeValue(jsonContentElement : any){
    if(jsonContentElement.timestamp != undefined){
        return getTimestampToTime(jsonContentElement.timestamp)
    }else{
        return "Error"
    }
}

export function buildSquawkValueForSbs(squawkValue : string){
    if(squawkValue === '' || squawkValue === 'NaN' || squawkValue === undefined){
        return ''
    }else{
        return squawkValue
    }
}

export function buildTimestampValue(item : any) : string{
    if(item.timestamp !== undefined && item.timestamp !== ''){
        return item.timestamp
    }else{
        if(item.dateMessageGenerated !== undefined && item.dateMessageGenerated !== '' && item.timeMessageGenerated !== undefined && item.timeMessageGenerated !== ''){
            return getDateToTimestamp(item.dateMessageGenerated,item.timeMessageGenerated)
        }else{
            return 'Error'
        }
    }
}

export function buildBooleanValueForCsv(boolValue : string){
    if(boolValue === undefined || boolValue === ''){
        return 'False'
    }else{
        if(boolValue === '1' || boolValue === '0'){
            if(boolValue === '1'){
                return 'True'
            }else{
                return 'False'
            }
        }else{
            if(boolValue === 'False' || boolValue === 'True'){
                return boolValue
            }else{
                return 'Error'
            }
        }
    }
}

export function buildSquawkValueForCsv(squawkValue : string){
    if(squawkValue === '' || squawkValue === 'NaN' || squawkValue === undefined){
        return 'NaN'
    }else{
        return squawkValue
    }
}