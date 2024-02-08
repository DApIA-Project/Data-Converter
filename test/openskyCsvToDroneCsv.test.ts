import { describe } from 'mocha'
import assert from 'assert'
import {openskyCsvToDroneCsv} from "../src/openskyCsvToDroneCsv";

describe('openskyCsvToDroneCsv', () => {
    context('when CSV Opensky data are not valid', () => {
        it('returns empty string if timestamp is missing', async () => {
            assert.deepStrictEqual(
                openskyCsvToDroneCsv(
                    'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
                    ',39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400',
                ),
                '',
            )
        })

        it('returns empty string if ICAO is missing', async () => {
            assert.deepStrictEqual(
                openskyCsvToDroneCsv(
                    'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
                    '1695215918,,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400',
                ),
                '',
            )
        })
    })

    context('when CSV Opensky data are valid', () => {
        const timestamp = '1672575671'
        const icao24 = '39c902'
        const latitude = '43.289794921875'
        const longitude = '5.40233523346657'
        const groundspeed = '3.450995263850706'
        const track = '296.565051177078'
        const vertical_rate = '5.85216'
        const callsign = 'SAMU13'
        const onground = 'True'
        const alert = 'True'
        const spi = 'True'
        const squawk = '7700'
        const altitude = '-45.72'
        const geoaltitude = '121.92'
        const lastcontact = '1672575670.797'
        const last_position = '1672575670.76'
        const hour = '1672574400'

        it('returns CSV Drone message', async () => {
            assert.deepStrictEqual(
                openskyCsvToDroneCsv(
                    'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
                    `${timestamp},${icao24},${latitude},${longitude},${groundspeed},${track},${vertical_rate},${callsign},${onground},${alert},${spi},${squawk},${altitude},${geoaltitude},${last_position},${lastcontact},${hour}`,
                ),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n'+
                `${callsign};${icao24};2023-01-01T12:21:11.000Z;;;;${latitude};${longitude};${geoaltitude};;;;;${track};${groundspeed};;;;;;;;;'{"vertical_rate":"${vertical_rate}","onground":"${onground}","alert":"${alert}","spi":"${spi}","squawk":"${squawk}","baroaltitude":"-45.72","last_position":"${last_position}","lastcontact":"${lastcontact}","hour":"${hour}"}'`,
            )
        })

        it('returns CSV drone message with double \\n', async () => {
            assert.deepStrictEqual(
                openskyCsvToDroneCsv(
                    'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
                    `${timestamp},${icao24},${latitude},${longitude},${groundspeed},${track},${vertical_rate},${callsign},${onground},${alert},${spi},${squawk},${altitude},${geoaltitude},${last_position},${lastcontact},${hour}\n\n`,
                ),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n'+
                `${callsign};${icao24};2023-01-01T12:21:11.000Z;;;;${latitude};${longitude};${geoaltitude};;;;;${track};${groundspeed};;;;;;;;;'{"vertical_rate":"${vertical_rate}","onground":"${onground}","alert":"${alert}","spi":"${spi}","squawk":"${squawk}","baroaltitude":"-45.72","last_position":"${last_position}","lastcontact":"${lastcontact}","hour":"${hour}"}'`,
            )
        })

        it('uses CSV extra field as CSV drone message properties if matching', async () => {
            assert.deepStrictEqual(
                openskyCsvToDroneCsv(
                    'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n' +
                    `${timestamp},${icao24},${latitude},${longitude},${groundspeed},${track},${vertical_rate},${callsign},${onground},${alert},${spi},${squawk},${altitude},${geoaltitude},${last_position},${lastcontact},${hour},'{"mach":"0"}'`,
                ),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n'+
                `${callsign};${icao24};2023-01-01T12:21:11.000Z;;;;${latitude};${longitude};${geoaltitude};;;;0;${track};${groundspeed};;;;;;;;;'{"vertical_rate":"${vertical_rate}","onground":"${onground}","alert":"${alert}","spi":"${spi}","squawk":"${squawk}","baroaltitude":"-45.72","last_position":"${last_position}","lastcontact":"${lastcontact}","hour":"${hour}"}'`,
            )
        })

        it('returns CSV Drone message with extra fields', async () => {
            assert.deepStrictEqual(
                openskyCsvToDroneCsv(
                    'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n' +
                    `${timestamp},${icao24},${latitude},${longitude},${groundspeed},${track},${vertical_rate},${callsign},${onground},${alert},${spi},${squawk},${altitude},${geoaltitude},${last_position},${lastcontact},${hour},'{"enRoute":"1"}'`,
                ),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n'+
                `${callsign};${icao24};2023-01-01T12:21:11.000Z;;;;${latitude};${longitude};${geoaltitude};;;;;${track};${groundspeed};;;;;;;;;'{"vertical_rate":"${vertical_rate}","onground":"${onground}","alert":"${alert}","spi":"${spi}","squawk":"${squawk}","baroaltitude":"-45.72","last_position":"${last_position}","lastcontact":"${lastcontact}","hour":"${hour}","enRoute":"1"}'`,
            )
        })

    })
})
