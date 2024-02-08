import { describe } from 'mocha'
import assert from 'assert'
import { sbsToCsv } from '../src'
import {sbsToDroneCsv} from "../src/sbsToDroneCsv";

describe('sbsToDroneCsv', () => {
    const messageType = 'MSG'
    const transmissionType = '3'
    const sessionID = '1'
    const aircraftID = '1'
    const hexIdent = '39c902'
    const flightID = '1'
    const dateMessageGenerated = '2023/01/01'
    const timeMessageGenerated = '13:21:11.000'
    const dateMessageLogged = '2023/01/02'
    const timeMessageLogged = '13:21:12.000'
    const callsign = 'SAMU13'
    const altitude = '35000'
    const groundSpeed = '265.8'
    const track = '296.5'
    const latitude = '43.2897'
    const longitude = '5.4023'
    const verticalRate = '5.85216'
    const squawk = '6503'
    const alert = '1'
    const emergency = '0'
    const spi = '1'
    const isOnGround = '1'

    context('when SBS data are not valid', () => {
        it('returns empty string if generated date is missing', async () => {
            assert.deepStrictEqual(
                sbsToDroneCsv(
                    `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},,${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
                    true),
                '',
            )
        })

        it('returns empty string if generated time is missing', async () => {
            assert.deepStrictEqual(
                sbsToDroneCsv(
                    `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
                    true),
                '',
            )
        })

        it('returns empty string if hexIdent (ICAO) is missing', async () => {
            assert.deepStrictEqual(
                sbsToDroneCsv(
                    `${messageType},${transmissionType},${sessionID},${aircraftID},,${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
                    true),
                '',
            )
        })
    })

    context('when SBS data are valid', () => {
        it('returns CSV drone message', async () => {
            assert.deepStrictEqual(
                sbsToDroneCsv(
                    `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
                    true),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n' +
                `${callsign};${hexIdent};2023-01-01T13:21:11.000Z;;;;${latitude};${longitude};${altitude};;;;;${track};${groundSpeed};;;;;;;;;'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false,"verticalRate":${verticalRate},"squawk":${squawk},"alert":true,"spi":true,"isOnGround":true}'`,
            )
        })

        it('returns CSV drone message with double \\n', async () => {
            assert.deepStrictEqual(
                sbsToDroneCsv(
                    `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n\n`,
                    true),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n' +
                `${callsign};${hexIdent};2023-01-01T13:21:11.000Z;;;;${latitude};${longitude};${altitude};;;;;${track};${groundSpeed};;;;;;;;;'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false,"verticalRate":${verticalRate},"squawk":${squawk},"alert":true,"spi":true,"isOnGround":true}'`,
            )
        })

        it('uses extra fields as CSV drone message properies if matching', async () => {
            assert.deepStrictEqual(
                sbsToDroneCsv(
                    `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround},{"baroaltitude":"-45.5"}`,
                    true),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n' +
                `${callsign};${hexIdent};2023-01-01T13:21:11.000Z;;;;${latitude};${longitude};${altitude};;;;;${track};${groundSpeed};;;;;;;;;'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false,"verticalRate":${verticalRate},"squawk":${squawk},"alert":true,"spi":true,"isOnGround":true}'`,
            )
        })

        it('returns CSV drone message with extra fields', async () => {
            assert.deepStrictEqual(
                sbsToDroneCsv(
                    `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround},{"last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400","enRoute":"1"}`,
                    true),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n' +
                `${callsign};${hexIdent};2023-01-01T13:21:11.000Z;;;;${latitude};${longitude};${altitude};;;;;${track};${groundSpeed};;;;;;;;;'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false,"verticalRate":${verticalRate},"squawk":${squawk},"alert":true,"spi":true,"isOnGround":true,"last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400","enRoute":"1"}'`,
            )
        })

        it('returns CSV message with extra fields to false', async () => {
            assert.deepStrictEqual(
                sbsToDroneCsv(
                    `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround},{"last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400","enRoute":"1"}`,
                    false),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
                `${callsign};${hexIdent};2023-01-01T13:21:11.000Z;;;;${latitude};${longitude};${altitude};;;;;${track};${groundSpeed};;;;;;;;`,
            )
        })
    })
})
