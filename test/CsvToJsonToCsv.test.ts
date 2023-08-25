import {describe} from "mocha";
import assert from "assert";
import {convertCSVtoJSON} from "../src/CsvToJson";
import {convertJSONtoCSV} from "../src/JsonToCsv";

describe('CsvToJsonToCsv', () => {

    context('Data csv valid', () => {
        it('return csv content when csv content is valid', async () => {
            const csvContent: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n";
            const jsonContent: string = convertCSVtoJSON(csvContent)
            const csvContent2: string = convertJSONtoCSV(jsonContent)

            const expectedResult: string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n"
            assert.deepStrictEqual(csvContent2, expectedResult)
        })

    })
})
