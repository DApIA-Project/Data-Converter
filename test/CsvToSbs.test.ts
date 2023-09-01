import {describe} from "mocha";
import {convertCSVtoSBS} from "../src";
import assert from "assert";
import {getTimestampToDate, getTimestampToTime} from "../src/utils/utils";

describe('CsvToSbs', () => {
    context('Timestamp no valid', () => {
        it('return Error when timestamp is string with letter', async () => {
            const date: string = getTimestampToDate("test")
            const timestamp: string = getTimestampToTime("test")
            assert.deepStrictEqual(date, "Error content file")
            assert.deepStrictEqual(timestamp, "Error content file")

        })


    })
    context('Timestamp valid', () => {
        it('return date valid when timestamp is normal', async () => {
            const date: string = getTimestampToDate("1685957892")
            const timestamp: string = getTimestampToTime("1685957892")
            assert.deepStrictEqual(date, "2023/06/05")
            assert.deepStrictEqual(timestamp, "09:38:12.000")
        })
        it('return date valid when timestamp is negative', async () => {
            const date: string = getTimestampToDate("-1685957892")
            const timestamp: string = getTimestampToTime("-1685957892")
            assert.deepStrictEqual(date, "1916/07/29")
            assert.deepStrictEqual(timestamp, "14:21:48.000")
        })
        it('return date valid when timestamp is float', async () => {
            const date: string = getTimestampToDate("1685957892.8222")
            const timestamp: string = getTimestampToTime("1685957892.8222")
            assert.deepStrictEqual(date, "2023/06/05")
            assert.deepStrictEqual(timestamp, "09:38:12.000")
        })

    })

    context('Data csv no valid extrafield', () => {
        it('return Error when csv content is no valid with extrafield undefined', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,{}";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "Error content file"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return Error when csv content is no valid with timestamp no valid', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "test,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            assert.deepStrictEqual(sbsContent, "Error content file")
        })


    })

    context('Data csv valid', () => {
        it('return sbs content when csv content is valid without extrafield', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return sbs content when csv content is valid with extrafield', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return sbs content when csv content is valid with extrafield with label', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\",\"haveLabel\":\"1\",\"label\":\"1024\"}'";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return sbs content when csv content is valid with track field and options alert, onground and spi to false', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,0,0,0,0,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return sbs content when csv content is valid with squawk empty', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return sbs content when csv content is valid with squawk', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,7015,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return sbs content when csv content is valid with 2 lines (same plane)', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n" +
                "1672575672,39c902,43.28981043928761,5.402265276227679,4.395411462756131,290.5560452195834,5.52704,SAMU13,True,True,True,NaN,-38.1,129.54,1672575671.346,1672575671.892,1672574400";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                "MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,45.72,4.395411462756131,290.5560452195834,43.28981043928761,5.402265276227679,5.52704,,1,0,1,1,{\"altitude\":\"-38.1\",\"last_position\":\"1672575671.346\",\"lastcontact\":\"1672575671.892\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return sbs content when csv content is valid with last line empty', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n" +
                "1672575672,39c902,43.28981043928761,5.402265276227679,4.395411462756131,290.5560452195834,5.52704,SAMU13,True,True,True,NaN,-38.1,129.54,1672575671.346,1672575671.892,1672574400\n" +
                "";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                "MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,45.72,4.395411462756131,290.5560452195834,43.28981043928761,5.402265276227679,5.52704,,1,0,1,1,{\"altitude\":\"-38.1\",\"last_position\":\"1672575671.346\",\"lastcontact\":\"1672575671.892\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return sbs content when csv content is valid with other order of fields', async () => {
            const csvContent: string = "hour,lastcontact,last_position,geoaltitude,altitude,squawk,spi,alert,onground,callsign,vertical_rate,track,groundspeed,longitude,latitude,icao24,timestamp,extraField\n" +
                "1672574400,1672575670.797,1672575670.76,121.92,-45.72,NaN,True,True,True,SAMU13,5.85216,296.565051177078,3.450995263850706,5.40233523346657,43.289794921875,39c902,1672575671,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            assert.deepStrictEqual(sbsContent, expectedResult)
        })


        it('return sbs content when csv content is valid with other order of fields but extraField is not to the end', async () => {
            const csvContent: string = "hour,lastcontact,last_position,geoaltitude,altitude,squawk,spi,alert,onground,callsign,vertical_rate,track,groundspeed,longitude,extraField,latitude,icao24,timestamp\n" +
                "1672574400,1672575670.797,1672575670.76,121.92,-45.72,NaN,True,True,True,SAMU13,5.85216,296.565051177078,3.450995263850706,5.40233523346657,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}',43.289794921875,39c902,1672575671";
            const sbsContent: string = convertCSVtoSBS(csvContent)
            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return sbs content when csv content is valid with values empty with extraField', async () => {
            const csvContent: string = "hour,lastcontact,last_position,geoaltitude,altitude,squawk,spi,alert,onground,callsign,vertical_rate,track,groundspeed,longitude,extraField,latitude,icao24,timestamp\n" +
                ",,,,,,,,,,,,,,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}',,,1672575671";
            const sbsContent: string = convertCSVtoSBS(csvContent)
            const expectedResult: string = "MSG,3,1,1,,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,,,,,,,,,0,0,0,0,{\"altitude\":\"\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}";
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return sbs content when csv content is valid with values empty without extraField', async () => {
            const csvContent: string = "hour,lastcontact,last_position,geoaltitude,altitude,squawk,spi,alert,onground,callsign,vertical_rate,track,groundspeed,longitude,latitude,icao24,timestamp\n" +
                ",,,,,,,,,,,,,,,,1672575671";
            const sbsContent: string = convertCSVtoSBS(csvContent)
            const expectedResult: string = "MSG,3,1,1,,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,,,,,,,,,0,0,0,0,{\"altitude\":\"\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}";
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return sbs content when csv content is valid with heading field without extrafield', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,heading,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return sbs content when csv content is valid with extrafield with lastposupdate field', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent: string = convertCSVtoSBS(csvContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })


    })
})
