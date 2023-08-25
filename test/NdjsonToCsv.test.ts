import {describe} from "mocha";
import assert from "assert";
import {convertNDJSONtoCSV} from "../src/NdjsonToCsv";
import {convertSBStoNDJSON} from "../src/SbsToNdjson";

describe('NdjsonToCsv', () => {
    context('Data json no valid no date', () => {
        it('return csv content empty when ndjson content is no valid no date', async () => {
            const ndjsonContent : string = "{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"\",\"callsign\":\"SWN5614\",\"altitude\":\"7450.0\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"vertical_rate\":\"2752.0\"," +
                "\"squawk\":\"1000\",\"alert\":\"1\",\"emergency\":\"\",\"spi\":\"0\",\"onground\":\"0\"}";
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)

            const expectedResult: string = ""
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content empty when ndjson content is no valid no icao', async () => {
            const ndjsonContent : string = "{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"\",\"flightID\":\"\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SWN5614\",\"altitude\":\"7450.0\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"vertical_rate\":\"2752.0\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"\",\"spi\":\"0\",\"onground\":\"0\"}";
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)

            const expectedResult: string = ""
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content empty when ndjson content is no valid onground malformed', async () => {
            const ndjsonContent : string = "{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SWN5614\",\"altitude\":\"7450.0\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"vertical_rate\":\"2752.0\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"\",\"spi\":\"0\",\"onground\":\"T\"}";
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)

            const expectedResult: string = ""
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content empty when ndjson content is no valid alert malformed', async () => {
            const ndjsonContent : string = "{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SWN5614\",\"altitude\":\"7450.0\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"vertical_rate\":\"2752.0\"," +
                "\"squawk\":\"\",\"alert\":\"F\",\"emergency\":\"\",\"spi\":\"0\",\"onground\":\"0\"}";
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)

            const expectedResult: string = ""
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content empty when ndjson content is no valid spi malformed', async () => {
            const ndjsonContent : string = "{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SWN5614\",\"altitude\":\"7450.0\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"vertical_rate\":\"2752.0\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"\",\"spi\":\"F\",\"onground\":\"0\"}";
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)

            const expectedResult: string = ""
            assert.deepStrictEqual(csvContent, expectedResult)
        })

    })

    context('Data ndjson valid', () => {
        it('return csv content when ndjson content is valid', async () => {
            const ndjsonContent : string = "{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SWN5614\",\"altitude\":\"7450.0\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"vertical_rate\":\"2752.0\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"\",\"spi\":\"0\",\"onground\":\"0\"}";
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672579271,39c902,43.84039306640625,1.292171034702035,291.0,355.66173320857183,2752.0,SWN5614,False,True,False,NaN,7450.0,7450.0,,,\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content when ndjson content is valid with many field empty', async () => {
            const ndjsonContent : string = "{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"\",\"altitude\":\"\",\"groundspeed\":\"\",\"track\":\"\",\"latitude\":\"\",\"longitude\":\"\",\"vertical_rate\":\"\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"\",\"spi\":\"0\",\"onground\":\"0\"}";
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672579271,39c902,,,,,,,False,True,False,NaN,,,,,\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })

        it('return csv content when sbs content is valid sbs to ndjson to csv', async () => {
            const sbsContent : string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const ndjsonContent : string = convertSBStoNDJSON(sbsContent)
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672579271,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,121.92,121.92,,,\n"
            assert.deepStrictEqual(csvContent, expectedResult)
        })

    })
})