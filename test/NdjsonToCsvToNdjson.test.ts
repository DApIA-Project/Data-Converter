import {describe} from "mocha";
import assert from "assert";
import {convertNDJSONtoCSV} from "../src/NdjsonToCsv";
import {convertCSVtoNDJSON} from "../src/CsvToNdjson";

describe('NdjsonToCsvToNdjson', () => {
    context('Data ndjson valid', () => {
        it('return ndjson content when ndjson content is valid', async () => {
            const ndjsonContent : string = "{\"timestamp\":\"1656766055\",\"icao24\":\"3b7b96\",\"latitude\":\"43.40913391113281\",\"longitude\":\"1.724150901617006\",\"groundspeed\":\"120.0\",\"track\":\"311.2759420272517\",\"vertical_rate\":\"128.0\",\"callsign\":\"DRAG66\",\"onground\":\"False\",\"alert\":\"False\",\"spi\":\"False\",\"squawk\":\"NaN\",\"altitude\":\"1850.0\",\"geoaltitude\":\"1850.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}";
            const csvContent : string = convertNDJSONtoCSV(ndjsonContent)
            const ndjsonContent2 : string = convertCSVtoNDJSON(csvContent)

            const expectedResult: string = "{\"timestamp\":\"1656766055\",\"icao24\":\"3b7b96\",\"latitude\":\"43.40913391113281\",\"longitude\":\"1.724150901617006\",\"groundspeed\":\"120.0\",\"track\":\"311.2759420272517\",\"vertical_rate\":\"128.0\",\"callsign\":\"DRAG66\",\"onground\":\"False\",\"alert\":\"False\",\"spi\":\"False\",\"squawk\":\"NaN\",\"altitude\":\"1850.0\",\"geoaltitude\":\"1850.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}";
            assert.deepStrictEqual(ndjsonContent2, expectedResult)
        })


    })
})