import {describe} from "mocha";
import assert from "assert";
import {convertJSONtoCSV} from "../src/JsonToCsv";
import {convertCSVtoJSON} from "../src/CsvToJson";

describe('JsonToCsvToJson', () => {
    context('Data json valid', () => {
        it('return csv content when json content is valid', async () => {
            const jsonContent : string = "[{\"timestamp\":\"1656766055\",\"icao24\":\"3b7b96\",\"latitude\":\"43.40913391113281\",\"longitude\":\"1.724150901617006\",\"groundspeed\":\"120.0\",\"track\":\"311.2759420272517\",\"vertical_rate\":\"128.0\",\"callsign\":\"DRAG66\",\"onground\":\"False\",\"alert\":\"False\",\"spi\":\"False\",\"squawk\":\"NaN\",\"altitude\":\"1850.0\",\"geoaltitude\":\"1850.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const csvContent : string = convertJSONtoCSV(jsonContent)
            const jsonContent2 : string = convertCSVtoJSON(csvContent)

            const expectedResult: string = "[{\"timestamp\":\"1656766055\",\"icao24\":\"3b7b96\",\"latitude\":\"43.40913391113281\",\"longitude\":\"1.724150901617006\",\"groundspeed\":\"120.0\",\"track\":\"311.2759420272517\",\"vertical_rate\":\"128.0\",\"callsign\":\"DRAG66\",\"onground\":\"False\",\"alert\":\"False\",\"spi\":\"False\",\"squawk\":\"NaN\",\"altitude\":\"1850.0\",\"geoaltitude\":\"1850.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            assert.deepStrictEqual(jsonContent2, expectedResult)
        })


    })
})