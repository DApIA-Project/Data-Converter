import {describe} from "mocha";
import assert from "assert";
import {convertJSONtoSBS} from "../src/JsonToSbs";
import {convertSBStoJSON} from "../src/SbsToJson";

describe('SbsToJson', () => {

    context('Data sbs no valid', () => {
        it('return empty content when sbs content is no valid missing attributes', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid icao is empty', async () => {
            const sbsContent: string = "MSG,3,1,1,,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid date generated is empty', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid time generated is empty', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid date logged is empty', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid time logged is empty', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })



        it('return empty content when sbs content is no valid icao is empty with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const jsonContent: string = convertSBStoJSON(sbsContent,true)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid date generated is empty with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const jsonContent: string = convertSBStoJSON(sbsContent,true)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid time generated is empty with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const jsonContent: string = convertSBStoJSON(sbsContent,true)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid date logged is empty with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const jsonContent: string = convertSBStoJSON(sbsContent,true)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid time logged is empty with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const jsonContent: string = convertSBStoJSON(sbsContent,true)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return empty content when sbs content is no valid extraField no valid with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{}";
            const jsonContent: string = convertSBStoJSON(sbsContent,true)

            const expectedResult: string = "[]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })
    })


    context('Data sbs valid', () => {
        it('return json content when sbs content is valid', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"1\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SAMU13\",\"altitude\":\"121.92\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"vertical_rate\":\"5.85216\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"0\",\"spi\":\"1\",\"onground\":\"1\"}]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return json content when sbs content is valid with label', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"1\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SAMU13\",\"altitude\":\"121.92\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"vertical_rate\":\"5.85216\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"0\",\"spi\":\"1\",\"onground\":\"1\",\"haveLabel\":\"1\",\"label\":\"1024\"}]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return json content when many attributes are empty', async () => {
            const sbsContent: string = ",,,,39c902,,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,,,,,,,,,,,,";
            const jsonContent: string = convertSBStoJSON(sbsContent)

            const expectedResult: string = "[{\"messageType\":\"\",\"transmissionType\":\"\",\"sessionID\":\"\",\"aircraftID\":\"\",\"icao24\":\"39c902\",\"flightID\":\"\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"\",\"altitude\":\"\",\"groundspeed\":\"\",\"track\":\"\",\"latitude\":\"\",\"longitude\":\"\",\"vertical_rate\":\"\"," +
                "\"squawk\":\"\",\"alert\":\"\",\"emergency\":\"\",\"spi\":\"\",\"onground\":\"\"}]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return sbs content when many attributes are empty sbs to json to sbs', async () => {
            const sbsContent: string = ",,,,39c902,,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,,,,,,,,,,,,";
            const jsonContent: string = convertSBStoJSON(sbsContent)
            const sbsContentFinish : string = convertJSONtoSBS(jsonContent)

            const expectedResult: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,,,,,,,,,0,0,0,0\n"
            assert.deepStrictEqual(sbsContentFinish, expectedResult)
        })


        it('return json content when sbs content is valid with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const jsonContent: string = convertSBStoJSON(sbsContent,true)

            const expectedResult: string = "[{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"1\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SAMU13\",\"altitude\":\"121.92\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"vertical_rate\":\"5.85216\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"0\",\"spi\":\"1\",\"onground\":\"1\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

        it('return json content when sbs content is valid with label with extraField', async () => {
            const sbsContent: string = "MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024,{\"altitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}";
            const jsonContent: string = convertSBStoJSON(sbsContent,true)

            const expectedResult: string = "[{\"messageType\":\"MSG\",\"transmissionType\":\"3\",\"sessionID\":\"1\",\"aircraftID\":\"1\",\"icao24\":\"39c902\",\"flightID\":\"1\",\"dateMessageGenerated\":\"2023/01/01\",\"timeMessageGenerated\":\"13:21:11.000\",\"dateMessageLogged\":\"2023/01/01\",\"timeMessageLogged\":\"13:21:11.000\",\"callsign\":\"SAMU13\",\"altitude\":\"121.92\",\"groundspeed\":\"3.450995263850706\",\"track\":\"296.565051177078\",\"latitude\":\"43.289794921875\",\"longitude\":\"5.40233523346657\",\"vertical_rate\":\"5.85216\"," +
                "\"squawk\":\"\",\"alert\":\"1\",\"emergency\":\"0\",\"spi\":\"1\",\"onground\":\"1\",\"haveLabel\":\"1\",\"label\":\"1024\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}]"
            assert.deepStrictEqual(jsonContent, expectedResult)
        })

    })
})