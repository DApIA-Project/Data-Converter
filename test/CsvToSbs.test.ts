import {describe} from "mocha";
import {convertCSVtoSBS, getTimestampToDate, getTimestampToTime} from "../src";
import assert from "assert";

describe('CsvToSbs', () => {
    context('Timestamp no valid', () => {
        it('return Error when timestamp is string with letter',async () => {
            const date : string = getTimestampToDate("test")
            const time : string = getTimestampToTime("test")
            assert.deepStrictEqual(date,"Error content file")
            assert.deepStrictEqual(time,"Error content file")

        })


    })
    context('Timestamp valid', () => {
        it('return date valid when timestamp is normal',async () => {
            const date : string = getTimestampToDate("1685957892")
            const time : string = getTimestampToTime("1685957892")
            assert.deepStrictEqual(date,"2023/06/05")
            assert.deepStrictEqual(time,"09:38:12.000")
        })
        it('return date valid when timestamp is negative',async () => {
            const date : string = getTimestampToDate("-1685957892")
            const time : string = getTimestampToTime("-1685957892")
            assert.deepStrictEqual(date,"1916/07/29")
            assert.deepStrictEqual(time,"14:21:48.000")
        })
        it('return date valid when timestamp is float',async () => {
            const date : string = getTimestampToDate("1685957892.8222")
            const time : string = getTimestampToTime("1685957892.8222")
            assert.deepStrictEqual(date,"2023/06/05")
            assert.deepStrictEqual(time,"09:38:12.000")
        })

    })

    context('Data csv no valid extrafield', () => {
        it('return Error when csv content is no valid with extrafield undefined',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,{}";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "Error content file"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
        it('return Error when csv content is no valid with timestamp no valid',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "test,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            assert.deepStrictEqual(sbsContent,"Error content file")
        })



    })

    context('Data csv valid', () => {
        it('return sbs content when csv content is valid without extrafield',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
        it('return sbs content when csv content is valid with extrafield',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
        it('return sbs content when csv content is valid with track field and options alert, onground and spi to false',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,track,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
        it('return sbs content when csv content is valid with squawk empty',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
        it('return sbs content when csv content is valid with squawk',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,7015,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
        it('return sbs content when csv content is valid with 2 lines (same plane)',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n" +
                "1672575672,39c902,43.28981043928761,5.402265276227679,4.395411462756131,290.5560452195834,5.52704,SAMU13,True,True,True,NaN,-38.1,129.54,1672575671.346,1672575671.892,1672574400";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                "MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,45.72,4.395411462756131,290.5560452195834,43.28981043928761,5.402265276227679,5.52704,,1,0,1,1,{\"baroaltitude\":\"-38.1\",\"lastposupdate\":\"1672575671.346\",\"lastcontact\":\"1672575671.892\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
        it('return sbs content when csv content is valid with last line empty',async () => {
            const csvContent : string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n" +
                "1672575672,39c902,43.28981043928761,5.402265276227679,4.395411462756131,290.5560452195834,5.52704,SAMU13,True,True,True,NaN,-38.1,129.54,1672575671.346,1672575671.892,1672574400\n" +
                "";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                "MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,45.72,4.395411462756131,290.5560452195834,43.28981043928761,5.402265276227679,5.52704,,1,0,1,1,{\"baroaltitude\":\"-38.1\",\"lastposupdate\":\"1672575671.346\",\"lastcontact\":\"1672575671.892\",\"hour\":\"1672574400\"}"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when csv content is valid with other order of fields',async () => {
             const csvContent : string = "hour,lastcontact,lastposupdate,geoaltitude,baroaltitude,squawk,spi,alert,onground,callsign,vertrate,heading,velocity,lon,lat,icao24,time,extraField\n" +
                "1672574400,1672575670.797,1672575670.76,121.92,-45.72,NaN,True,True,True,SAMU13,5.85216,296.565051177078,3.450995263850706,5.40233523346657,43.289794921875,39c902,1672575671,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'";
            const sbsContent : string = convertCSVtoSBS(csvContent)

            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            assert.deepStrictEqual(sbsContent,expectedResult)
        })


        it('return sbs content when csv content is valid with other order of fields but extraField is not to the end',async () => {
            const csvContent : string = "hour,lastcontact,lastposupdate,geoaltitude,baroaltitude,squawk,spi,alert,onground,callsign,vertrate,heading,velocity,lon,extraField,lat,icao24,time\n" +
                "1672574400,1672575670.797,1672575670.76,121.92,-45.72,NaN,True,True,True,SAMU13,5.85216,296.565051177078,3.450995263850706,5.40233523346657,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}',43.289794921875,39c902,1672575671";
            const sbsContent : string = convertCSVtoSBS(csvContent)
            const expectedResult : string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,38.1,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when csv content is valid with values empty with extraField',async () => {
            const csvContent : string = "hour,lastcontact,lastposupdate,geoaltitude,baroaltitude,squawk,spi,alert,onground,callsign,vertrate,heading,velocity,lon,extraField,lat,icao24,time\n" +
                ",,,,,,,,,,,,,,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}',,,1672575671";
            const sbsContent : string = convertCSVtoSBS(csvContent)
            const expectedResult : string = "MSG,3,1,1,,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,,,,,,,,,0,0,0,0,{\"baroaltitude\":\"\",\"lastposupdate\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}";
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when csv content is valid with values empty without extraField',async () => {
            const csvContent : string = "hour,lastcontact,lastposupdate,geoaltitude,baroaltitude,squawk,spi,alert,onground,callsign,vertrate,heading,velocity,lon,lat,icao24,time\n" +
                ",,,,,,,,,,,,,,,,1672575671";
            const sbsContent : string = convertCSVtoSBS(csvContent)
            const expectedResult : string = "MSG,3,1,1,,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,,,,,,,,,0,0,0,0,{\"baroaltitude\":\"\",\"lastposupdate\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}";
            assert.deepStrictEqual(sbsContent,expectedResult)
        })




    })
})