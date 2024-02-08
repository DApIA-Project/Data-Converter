import { describe } from 'mocha'
import assert from 'assert'
import {droneCsvToSbs} from "../src/droneCsvToSbs";

describe('droneCsvToSbs', () => {
    context('when CSV drone data are not valid', () => {
        it('returns empty string if date is missing', async () => {
            assert.deepStrictEqual(
                droneCsvToSbs(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    'FAZER-01-bubble;AAAAAA;;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A'
                ),
                '',
            )
        })

        it('returns empty string if ICAO is missing', async () => {
            assert.deepStrictEqual(
                droneCsvToSbs(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    'FAZER-01-bubble;;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A'
                ),
                '',
            )
        })
    })

    context('when CSV drone data are valid', () => {
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

        it('returns SBS message', async () => {
            assert.deepStrictEqual(
                droneCsvToSbs(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    `${name};${icao24};${date};${fixName};${significantPoint};${timeElapsed};${positionLatitude};${positionLongitude};${positionAltitude};${altitudeMax};${airSpeed};${cas};${mach};${heading};${groundSpeed};${distanceToNextWaypoint};${flownDistance};${windEastward};${windNorthward};${windUpward};${route};${mass};${isOneWay}`,
                ),
                `MSG,3,1,1,${icao24},1,2023/10/02,08:00:01.000,2023/10/02,08:00:01.000,${name},${positionAltitude},${groundSpeed},${heading},${positionLatitude},${positionLongitude},,,0,,0,0,{"fixName":"${fixName}","significantPoint":"${significantPoint}","timeElapsed (s)":"${timeElapsed}","altitudeMax (ft)":"${altitudeMax}","airSpeed (kt)":"${airSpeed}","cas (kt)":"${cas}","mach":"${mach}","distanceToNextWaypoint (NM)":"${distanceToNextWaypoint}","flownDistance (NM)":"${flownDistance}","wind.eastward (kt)":"${windEastward}","wind.northward (kt)":"${windNorthward}","wind.upward (ft/min)":"${windUpward}","route (deg)":"${route}","mass (kg)":"${mass}","isOneWay":"${isOneWay}"}`,
            )
        })

        it('returns SBS message with double \\n', async () => {
            assert.deepStrictEqual(
                droneCsvToSbs(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    `${name};${icao24};${date};${fixName};${significantPoint};${timeElapsed};${positionLatitude};${positionLongitude};${positionAltitude};${altitudeMax};${airSpeed};${cas};${mach};${heading};${groundSpeed};${distanceToNextWaypoint};${flownDistance};${windEastward};${windNorthward};${windUpward};${route};${mass};${isOneWay}\n\n`,
                ),
                `MSG,3,1,1,${icao24},1,2023/10/02,08:00:01.000,2023/10/02,08:00:01.000,${name},${positionAltitude},${groundSpeed},${heading},${positionLatitude},${positionLongitude},,,0,,0,0,{"fixName":"${fixName}","significantPoint":"${significantPoint}","timeElapsed (s)":"${timeElapsed}","altitudeMax (ft)":"${altitudeMax}","airSpeed (kt)":"${airSpeed}","cas (kt)":"${cas}","mach":"${mach}","distanceToNextWaypoint (NM)":"${distanceToNextWaypoint}","flownDistance (NM)":"${flownDistance}","wind.eastward (kt)":"${windEastward}","wind.northward (kt)":"${windNorthward}","wind.upward (ft/min)":"${windUpward}","route (deg)":"${route}","mass (kg)":"${mass}","isOneWay":"${isOneWay}"}`,
            )
        })

        it('uses CSV drone extra field as SBS message properties if matching', async () => {
            assert.deepStrictEqual(
                droneCsvToSbs(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay;extraField\n' +
                    `${name};${icao24};${date};${fixName};${significantPoint};${timeElapsed};${positionLatitude};${positionLongitude};${positionAltitude};${altitudeMax};${airSpeed};${cas};${mach};${heading};${groundSpeed};${distanceToNextWaypoint};${flownDistance};${windEastward};${windNorthward};${windUpward};${route};${mass};${isOneWay};'{"messageType":"SEL","transmissionType":"2","sessionID":"3","aircraftID":"4","flightID":"5","emergency":"1"}'`,
                ),
                `SEL,2,3,4,${icao24},5,2023/10/02,08:00:01.000,2023/10/02,08:00:01.000,${name},${positionAltitude},${groundSpeed},${heading},${positionLatitude},${positionLongitude},,,0,1,0,0,{"fixName":"${fixName}","significantPoint":"${significantPoint}","timeElapsed (s)":"${timeElapsed}","altitudeMax (ft)":"${altitudeMax}","airSpeed (kt)":"${airSpeed}","cas (kt)":"${cas}","mach":"${mach}","distanceToNextWaypoint (NM)":"${distanceToNextWaypoint}","flownDistance (NM)":"${flownDistance}","wind.eastward (kt)":"${windEastward}","wind.northward (kt)":"${windNorthward}","wind.upward (ft/min)":"${windUpward}","route (deg)":"${route}","mass (kg)":"${mass}","isOneWay":"${isOneWay}"}`,
            )
        })

                it('returns SBS message with extra fields', async () => {
                    assert.deepStrictEqual(
                        droneCsvToSbs(
                            'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay;extraField\n' +
                            `${name};${icao24};${date};${fixName};${significantPoint};${timeElapsed};${positionLatitude};${positionLongitude};${positionAltitude};${altitudeMax};${airSpeed};${cas};${mach};${heading};${groundSpeed};${distanceToNextWaypoint};${flownDistance};${windEastward};${windNorthward};${windUpward};${route};${mass};${isOneWay};'{"enRoute": "1"}'`,
                        ),
                        `MSG,3,1,1,${icao24},1,2023/10/02,08:00:01.000,2023/10/02,08:00:01.000,${name},${positionAltitude},${groundSpeed},${heading},${positionLatitude},${positionLongitude},,,0,,0,0,{"fixName":"${fixName}","significantPoint":"${significantPoint}","timeElapsed (s)":"${timeElapsed}","altitudeMax (ft)":"${altitudeMax}","airSpeed (kt)":"${airSpeed}","cas (kt)":"${cas}","mach":"${mach}","distanceToNextWaypoint (NM)":"${distanceToNextWaypoint}","flownDistance (NM)":"${flownDistance}","wind.eastward (kt)":"${windEastward}","wind.northward (kt)":"${windNorthward}","wind.upward (ft/min)":"${windUpward}","route (deg)":"${route}","mass (kg)":"${mass}","isOneWay":"${isOneWay}","enRoute":"1"}`,
                    )
                })
            })
})
