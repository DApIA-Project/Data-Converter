import { describe } from 'mocha'
import assert from 'assert'
import { sbsToCsv } from '../src'
import {droneCsvToCsv} from "../src/droneCsvToCsv";
import {droneCsvToSbs} from "../src/droneCsvToSbs";

describe('droneCsvToCsv', () => {
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
    const squawk = ''
    const alert = '1'
    const emergency = '0'
    const spi = '1'
    const isOnGround = '1'

    context('when Csv drone data are not valid', () => {
        it('returns empty string if generated date is missing', async () => {
            assert.deepStrictEqual(
                droneCsvToCsv(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    'FAZER-01-bubble;AAAAAA;;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A'
                ),
                '',
            )
        })

        it('returns empty string if hexIdent (ICAO) is missing', async () => {
            assert.deepStrictEqual(
                droneCsvToCsv(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    'FAZER-01-bubble;;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A'
                ),
                '',
            )
        })
    })

    context('when Csv drone data are valid', () => {
        const name = 'Drone-1'
        const icao24 = 'AAAAAA'
        const date = '2023-10-02T08:00:01Z'
        const fixName = ''
        const significantPoint = ''
        const timeElapsed = '1'
        const positionLatitude = '43.6138206887089'
        const positionLongitude = '1.401640313032366'
        const positionAltitude = '10.84251968503937'
        const altitudeMax = '57094.800177084115'
        const airSpeed = '0'
        const cas = '0'
        const mach = '0'
        const heading = '180'
        const groundSpeed = '0'
        const distanceToNextWaypoint = '0'
        const flownDistance = '0'
        const windEastward = '0'
        const windNorthward = '0'
        const windUpward = '0'
        const route = '180'
        const mass = '20'
        const isOneWay = 'N/A'

        it('returns CSV message', async () => {
            assert.deepStrictEqual(
                droneCsvToCsv(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    `${name};${icao24};${date};${fixName};${significantPoint};${timeElapsed};${positionLatitude};${positionLongitude};${positionAltitude};${altitudeMax};${airSpeed};${cas};${mach};${heading};${groundSpeed};${distanceToNextWaypoint};${flownDistance};${windEastward};${windNorthward};${windUpward};${route};${mass};${isOneWay}`,
                ),
                `timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,extraField\n`+
                `1696233601,AAAAAA,43.6138206887089,1.401640313032366,0,180,,Drone-1,,,,,10.84251968503937,10.84251968503937,'{"fixName":"","significantPoint":"","timeElapsed (s)":"1","altitudeMax (ft)":"57094.800177084115","airSpeed (kt)":"0","cas (kt)":"0","mach":"0","distanceToNextWaypoint (NM)":"0","flownDistance (NM)":"0","wind.eastward (kt)":"0","wind.northward (kt)":"0","wind.upward (ft/min)":"0","route (deg)":"180","mass (kg)":"20","isOneWay":"N/A"}'`,
            )
        })

        it('returns CSV message with double \\n', async () => {
            assert.deepStrictEqual(
                droneCsvToCsv(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    `${name};${icao24};${date};${fixName};${significantPoint};${timeElapsed};${positionLatitude};${positionLongitude};${positionAltitude};${altitudeMax};${airSpeed};${cas};${mach};${heading};${groundSpeed};${distanceToNextWaypoint};${flownDistance};${windEastward};${windNorthward};${windUpward};${route};${mass};${isOneWay}\n\n`,
                ),
                `timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,extraField\n`+
                `1696233601,AAAAAA,43.6138206887089,1.401640313032366,0,180,,Drone-1,,,,,10.84251968503937,10.84251968503937,'{"fixName":"","significantPoint":"","timeElapsed (s)":"1","altitudeMax (ft)":"57094.800177084115","airSpeed (kt)":"0","cas (kt)":"0","mach":"0","distanceToNextWaypoint (NM)":"0","flownDistance (NM)":"0","wind.eastward (kt)":"0","wind.northward (kt)":"0","wind.upward (ft/min)":"0","route (deg)":"180","mass (kg)":"20","isOneWay":"N/A"}'`,
            )
        })

        it('uses extra fields as CSV message properies if matching', async () => {
            assert.deepStrictEqual(
                droneCsvToCsv(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay;extraField\n' +
                    `${name};${icao24};${date};${fixName};${significantPoint};${timeElapsed};${positionLatitude};${positionLongitude};${positionAltitude};${altitudeMax};${airSpeed};${cas};${mach};${heading};${groundSpeed};${distanceToNextWaypoint};${flownDistance};${windEastward};${windNorthward};${windUpward};${route};${mass};${isOneWay};'{"messageType":"SEL","transmissionType":"2","sessionID":"3","aircraftID":"4","flightID":"5","emergency":"1"}'`,
                ),
                `timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,extraField\n`+
                `1696233601,AAAAAA,43.6138206887089,1.401640313032366,0,180,,Drone-1,,,,,10.84251968503937,10.84251968503937,'{"fixName":"","significantPoint":"","timeElapsed (s)":"1","altitudeMax (ft)":"57094.800177084115","airSpeed (kt)":"0","cas (kt)":"0","mach":"0","distanceToNextWaypoint (NM)":"0","flownDistance (NM)":"0","wind.eastward (kt)":"0","wind.northward (kt)":"0","wind.upward (ft/min)":"0","route (deg)":"180","mass (kg)":"20","isOneWay":"N/A","messageType":"SEL","transmissionType":"2","sessionID":"3","aircraftID":"4","flightID":"5","emergency":"1"}'`,
            )
        })

        it('returns CSV message with extra fields', async () => {
            assert.deepStrictEqual(
                droneCsvToCsv(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay;extraField\n' +
                    `${name};${icao24};${date};${fixName};${significantPoint};${timeElapsed};${positionLatitude};${positionLongitude};${positionAltitude};${altitudeMax};${airSpeed};${cas};${mach};${heading};${groundSpeed};${distanceToNextWaypoint};${flownDistance};${windEastward};${windNorthward};${windUpward};${route};${mass};${isOneWay};'{"enRoute": "1"}'`,
                ),
                `timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,extraField\n`+
                `1696233601,AAAAAA,43.6138206887089,1.401640313032366,0,180,,Drone-1,,,,,10.84251968503937,10.84251968503937,'{"fixName":"","significantPoint":"","timeElapsed (s)":"1","altitudeMax (ft)":"57094.800177084115","airSpeed (kt)":"0","cas (kt)":"0","mach":"0","distanceToNextWaypoint (NM)":"0","flownDistance (NM)":"0","wind.eastward (kt)":"0","wind.northward (kt)":"0","wind.upward (ft/min)":"0","route (deg)":"180","mass (kg)":"20","isOneWay":"N/A","enRoute":"1"}'`,
            )
        })
    })
})
