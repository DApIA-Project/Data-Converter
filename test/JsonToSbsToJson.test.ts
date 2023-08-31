import {describe} from "mocha";
import assert from "assert";
import {convertJSONtoSBS} from "../src/JsonToSbs";
import {convertSBStoJSON} from "../src/SbsToJson";

describe('JsonToSbs', () => {

    context('Data json valid', () => {
        it('return sbs content when json content is valid',async () => {
            const jsonContent : string = "[{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"1\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SAMU13\",\"altitude\":\"121.92\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"vertical_rate\":\"5.85216\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"0\",\"spi\":\"1\",\"onground\":\"1\"}]"
            const sbsContent : string = convertJSONtoSBS(jsonContent)
            const jsonContent2 : string = convertSBStoJSON(sbsContent)

            const expectedResult : string = "[{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"1\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SAMU13\",\"altitude\":\"121.92\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"vertical_rate\":\"5.85216\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"0\",\"spi\":\"1\",\"onground\":\"1\"}]"
            assert.deepStrictEqual(jsonContent2,expectedResult)
        })


        it('return sbs content when json content is valid with extraField',async () => {
            const jsonContent : string = "[{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"1\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SAMU13\",\"altitude\":\"121.92\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"vertical_rate\":\"5.85216\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"0\",\"spi\":\"1\",\"onground\":\"1\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]"
            const sbsContent : string = convertJSONtoSBS(jsonContent,true)
            const jsonContent2 : string = convertSBStoJSON(sbsContent,true)

            const expectedResult : string = "[{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"1\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SAMU13\",\"altitude\":\"121.92\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"vertical_rate\":\"5.85216\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"0\",\"spi\":\"1\",\"onground\":\"1\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]"
            assert.deepStrictEqual(jsonContent2,expectedResult)
        })
    })
})