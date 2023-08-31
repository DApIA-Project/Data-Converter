import {describe} from "mocha";
import assert from "assert";
import {convertSBStoJSON} from "../src/SbsToJson";
import {convertJSONtoCSV} from "../src/JsonToCsv";
import {convertSBStoNDJSON} from "../src/SbsToNdjson";
import {convertNDJSONtoCSV} from "../src/NdjsonToCsv";

describe('SbsToNdjsonToCsv', () => {
    context('Data sbs no valid', () => {
        it('return csv content when sbs content is valid with values empty', async () => {
            const sbsContent: string = "MSG,3,1,1,,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,,,,,,,,,0,0,0,0";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,false)

            const expectedResult: string = ""
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content when sbs content is valid with values empty with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,,,,,,,,,0,0,0,0";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,true)

            const expectedResult: string = ""
            assert.deepStrictEqual(csvContent, expectedResult)
        })
    })

    context('Data sbs valid', () => {
        it('return csv content when sbs content is valid', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,false)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,,121.92,,,\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content when sbs content is valid with label', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,false)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,,121.92,,,\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })



        it('return csv content when sbs content is valid with squawk and alert, emergency and isonground to false', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,0,0,0,0";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,false)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,7015,,121.92,,,\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })
        it('return csv content when sbs content is valid with last line empty', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,0,0,0,0\n" +
                "";
            const ndjsonContent: string = convertSBStoJSON(sbsContent)
            const csvContent: string = convertJSONtoCSV(ndjsonContent,false)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,7015,,121.92,,,\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content when sbs content is valid with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,true)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,,121.92,,,,\'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}\'\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })


        it('return csv content when sbs content is valid with label with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,true)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,,121.92,,,,\'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\",\"haveLabel\":\"1\",\"label\":\"1024\"}\'\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })



        it('return csv content when sbs content is valid with squawk and alert, emergency and isonground to false with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,,,,";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,true)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,7015,,121.92,,,,\'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}\'\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })
        it('return csv content when sbs content is valid with last line empty with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,0,0,0,0\n" +
                "";
            const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
            const csvContent: string = convertNDJSONtoCSV(ndjsonContent,true)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,7015,,121.92,,,,\'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}\'\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })



    })
})