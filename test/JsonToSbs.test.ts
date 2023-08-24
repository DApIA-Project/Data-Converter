import {describe} from "mocha";
import assert from "assert";
import {convertJSONtoSBS} from "../src/JsonToSbs";
import {convertCSVtoJSON} from "../src/CsvToJson";

describe('JsonToSbs', () => {

    context('Data json no valid', () => {
        it('return empty content when boolean is not a boolean for alert',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"0\",\"alert\":\"T\",\"spi\":\"1\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = ""
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return empty content when boolean is not a boolean for spi',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"0\",\"alert\":\"0\",\"spi\":\"T\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = ""
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return empty content when boolean is not a boolean for onground',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"T\",\"alert\":\"0\",\"spi\":\"0\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = ""
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return empty content when timestamp and date and time are not present',async () => {
            const jsonContent : string = "[{\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"0\",\"alert\":\"T\",\"spi\":\"1\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = ""
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return empty content when icao is not present',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"0\",\"alert\":\"T\",\"spi\":\"1\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = ""
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return empty content when haveLabel present but not label',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"0\",\"alert\":\"0\",\"spi\":\"1\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"haveLabel\":\"1\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = ""
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return empty content when label present but not haveLabel',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"0\",\"alert\":\"0\",\"spi\":\"1\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"label\":\"1024\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = ""
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
    })

    context('Data json valid', () => {
        it('return sbs content when json content is valid',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"0\",\"alert\":\"0\",\"spi\":\"1\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,0,0,1,0\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })
        it('return sbs content when json content is valid with False for boolean value',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"False\",\"alert\":\"False\",\"spi\":\"False\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,0,0,0,0\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with True for boolean value',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"spi\":\"True\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,1,0,1,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with undefined boolean value',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with undefined squawk value',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with empty squawk value',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with NaN squawk value',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with message type present',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"messageType\":\"STA\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "STA,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with transmission type present',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"transmissionType\":\"5\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,5,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with sessionID present',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"sessionID\":\"2022\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,2022,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with aircraftID present',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"aircraftID\":\"2022\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,2022,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with flightID present',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"flightID\":\"2022\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,2022,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with aircraftID present second time',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}," +
                "{\"timestamp\":\"1659127351\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n" +
                "MSG,3,1,1,34648e,1,2022/07/29,20:42:31.000,2022/07/29,20:42:31.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with label',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"0\",\"alert\":\"0\",\"spi\":\"1\",\"squawk\":\"1000\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"haveLabel\":\"1\",\"label\":\"1024\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,0,0,1,0,1,1024\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with many undefined attributes',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\"," +
                "\"onground\":\"0\",\"alert\":\"0\",\"spi\":\"1\",\"squawk\":\"1000\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,,,,,,,,1000,0,0,1,0\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with emergency present',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"emergency\":\"1\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,1,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when json content is valid with date and time present',async () => {
            const jsonContent : string = "[{\"timestamp\":\"1659127350\",\"icao24\":\"34648e\",\"latitude\":\"43.84039306640625\",\"longitude\":\"1.292171034702035\",\"groundspeed\":\"291.0\",\"track\":\"355.66173320857183\",\"vertical_rate\":\"2752.0\",\"callsign\":\"SWN5614\"," +
                "\"onground\":\"True\",\"alert\":\"True\",\"squawk\":\"NaN\",\"altitude\":\"7450.0\",\"geoaltitude\":\"7450.0\",\"last_position\":\"\",\"lastcontact\":\"\",\"hour\":\"\",\"dateMessageGenerated\":\"2022/07/29\",\"timeMessageGenerated\":\"20:42:30.000\",\"dateMessageLogged\":\"2022/07/29\",\"timeMessageLogged\":\"20:42:30.000\"}]";
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })

        it('return sbs content when is csv to json to sbs',async () => {
            const csvContent : string = "timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n" +
                "1656766055,3b7b96,43.40913391113281,1.724150901617006,120.0,311.2759420272517,128.0,DRAG66,False,False,False,NaN,1850.0,1850.0,,,"
            const jsonContent : string = convertCSVtoJSON(csvContent)
            const sbsContent : string = convertJSONtoSBS(jsonContent)

            const expectedResult : string = "MSG,3,1,1,3b7b96,1,2022/07/02,12:47:35.000,2022/07/02,12:47:35.000,DRAG66,1850.0,120.0,311.2759420272517,43.40913391113281,1.724150901617006,128.0,,0,0,0,0\n"
            assert.deepStrictEqual(sbsContent,expectedResult)
        })



    })
})