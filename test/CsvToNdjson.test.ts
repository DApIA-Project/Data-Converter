import {describe} from "mocha";
import assert from "assert";
import {convertCSVtoNDJSON} from "../src/CsvToNdjson";
import {convertNDJSONtoSBS} from "../src/NdjsonToSbs";
import {convertCSVtoJSON} from "../src/CsvToJson";

describe('CsvToNdson', () => {

    context('Data csv valid', () => {
        it('return sbs content when csv content is valid  for csv to ndjson to sbs', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400";
            const ndjsonContent: string = convertCSVtoNDJSON(csvContent)
            const sbsContent: string = convertNDJSONtoSBS(ndjsonContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,-45.72,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n"
            assert.deepStrictEqual(sbsContent, expectedResult)
        })


        it('return ndjson content when csv content is valid with extraField', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}'"
            const ndjsonContent: string = convertCSVtoNDJSON(csvContent)

            const expectedResult: string = "{\"timestamp\":\"1672575671\",\"icao24\":\"39c902\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"vertical_rate\":\"5.85216\",\"callsign\":\"SAMU13\",\"onground\":\"True\",\"alert\":\"True\",\"spi\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"-45.72\",\"geoaltitude\":\"121.92\",\"lastposupdate\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\",\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"flightID\":\"1\",\"emergency\":\"0\"}"
            assert.deepStrictEqual(ndjsonContent, expectedResult)
        })
    })

})