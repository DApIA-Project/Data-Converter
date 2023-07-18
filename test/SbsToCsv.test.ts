import {describe} from "mocha";
import { convertSBStoCSV, getDateToTimestamp} from "../src";
import assert from "assert";

describe('SbsToCsv', () => {
    context('Date or time no valid', () => {
        it('return Error when date have not good format', async () => {
            const timestamp: string = getDateToTimestamp("test", "12:12:12.000")
            assert.deepStrictEqual(timestamp, "Error content file")

        })
        it('return Error when time have not good format', async () => {
            const timestamp: string = getDateToTimestamp("2023/06/05", "test")
            assert.deepStrictEqual(timestamp, "Error content file")

        })
    })
    context('Date and time valid', () => {
        it('return timestamp when date and time have good format', async () => {
            const timestamp: string = getDateToTimestamp("2023/06/05", "12:12:12.000")
            assert.deepStrictEqual(timestamp, "1685967132")

        })
    })

    context('Data sbs no valid', () => {
        it('return Error when extrafield is empty', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{}";
            const sbsContent: string = convertSBStoCSV(csvContent,true)

            const expectedResult: string = "Error content file"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return Error when extrafield is empty and not save ExtraField', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{}";
            const sbsContent: string = convertSBStoCSV(csvContent)

            const expectedResult: string = "Error content file"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
    })

    context('Data sbs valid', () => {
        it('return csv content when sbs content is valid without extrafield', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const sbsContent: string = convertSBStoCSV(csvContent)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,121.92,121.92,,,"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return csv content when sbs content is valid without extrafield and with label', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024";
            const sbsContent: string = convertSBStoCSV(csvContent)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,121.92,121.92,,,"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return csv content when sbs content is valid with extrafield', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const sbsContent: string = convertSBStoCSV(csvContent, true)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return csv content when sbs content is valid with extrafield and with label', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const sbsContent: string = convertSBStoCSV(csvContent, true)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\",\"haveLabel\":\"1\",\"label\":\"1024\"}'"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return csv content when sbs content is valid with squawk and alert, emergency and isonground to false', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const sbsContent: string = convertSBStoCSV(csvContent,true)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,7015,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return csv content when sbs content is valid with last line empty', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                                        "";
            const sbsContent: string = convertSBStoCSV(csvContent,true)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,7015,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return csv content when sbs content is valid without extrafield and not save ExtraField', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const sbsContent: string = convertSBStoCSV(csvContent)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,121.92,121.92,,,"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return csv content when sbs content is valid with extrafield and not save ExtraField', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const sbsContent: string = convertSBStoCSV(csvContent)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return csv content when sbs content is valid with squawk and alert, emergency and isonground to false and not save ExtraField', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const sbsContent: string = convertSBStoCSV(csvContent)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,7015,-45.72,121.92,1672575670.76,1672575670.797,1672574400"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })
        it('return csv content when sbs content is valid with last line empty and not save ExtraField', async () => {
            const csvContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                "";
            const sbsContent: string = convertSBStoCSV(csvContent)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,7015,-45.72,121.92,1672575670.76,1672575670.797,1672574400"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })

        it('return csv content when sbs content is valid with values empty without extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,,,,,,,,,0,0,0,0,{\"baroaltitude\":\"\",\"lastposupdate\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}";
            const csvContent: string = convertSBStoCSV(sbsContent)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour\n" +
                "1672575671,,,,,,,,False,False,False,NaN,,,,,"
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content when sbs content is valid with values empty with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,,,,,,,,,0,0,0,0,{\"baroaltitude\":\"\",\"lastposupdate\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}";
            const csvContent: string = convertSBStoCSV(sbsContent,true)

            const expectedResult: string = "time,icao24,lat,lon,velocity,heading,vertrate,callsign,onground,alert,spi,squawk,baroaltitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672575671,,,,,,,,False,False,False,NaN,,,,,,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'"
            assert.deepStrictEqual(csvContent, expectedResult)
        })
    })
})