import {describe} from "mocha";
import assert from "assert";
import {convertCSVtoNDJSON} from "../src/CsvToNdjson";
import {convertNDJSONtoSBS} from "../src/NdjsonToSbs";

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
    })

})