import { describe } from 'mocha'
import assert from 'assert'
import { droneCsvToJson } from '../src/droneCsvToJson'

describe('droneCsvToJson', () => {
    context('when CSV drone data are invalid', () => {
        it('returns empty array if date is malformed', () => {
            for (const timestamp of ['', 'not_a_number']) {
                const json = droneCsvToJson(
                    'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundspeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
                    `DRONE1;AAAAAA;${timestamp};;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A`
                )
                assert.deepStrictEqual(json, [])
            }
        })
    })

    context('when CSV drone data are valid', () => {
        it('returns an array', () => {
            const json = droneCsvToJson(
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundspeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
                `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A`
            )
            assert.deepStrictEqual(json, [
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:01Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '43.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '180',
                    mass: '20',
                    isOneWay: 'N/A',
                },
            ])
        })

        it('returns an array with double \\n', () => {
            const json = droneCsvToJson(
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundspeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
                `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A\n\n`
            )
            assert.deepStrictEqual(json, [
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:01Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '43.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '180',
                    mass: '20',
                    isOneWay: 'N/A',
                },
            ])
        })

        it('returns extra fields if present', () => {
            const json = droneCsvToJson(
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundspeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n' +
                `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A;'{"messageType":"MSG","transmissionType":"3","sessionID":"1","aircraftID":"1","flightID":"1","emergency":"0"}'\n`,
              {saveExtraField: true}
            )

            assert.deepStrictEqual(json, [
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:01Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '43.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '180',
                    mass: '20',
                    isOneWay: 'N/A',
                    messageType: 'MSG',
                    transmissionType: '3',
                    sessionID: '1',
                    aircraftID: '1',
                    flightID: '1',
                    emergency: '0',
                },
            ])
        })

        it('does not return no extra fields if empty', async () => {
            const json = droneCsvToJson(
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundspeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
                `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A\n`,
              {saveExtraField: true}
            )
            assert.deepStrictEqual(json, [
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:01Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '43.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '180',
                    mass: '20',
                    isOneWay: 'N/A',
                },
            ])
        })

        it('returns an merged array when have 2 messages with same of couple timestamp/icao', () => {
            const json = droneCsvToJson(
              'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundspeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
              `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A\n`+
              `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;182;20;N/A\n`+
              `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;42.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;182;20;N/A`,
              {mustMerge: true}
            )
            assert.deepStrictEqual(json, [
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:01Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '42.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '182',
                    mass: '20',
                    isOneWay: 'N/A',
                },
            ])
        })

        it('returns an array who complete empty message not according to icao', () => {
            const json = droneCsvToJson(
              'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundspeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
              `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A\n`+
              `DRONE1;AAAAAA;2023-10-02T08:00:03Z;;;1;;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;182;20;N/A\n`+
              `DRONE1;AAAAAA;2023-10-02T08:00:06Z;;;1;42.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;182;20;N/A`,
              {mustMerge: true}
            )
            assert.deepStrictEqual(json, [
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:01Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '43.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '180',
                    mass: '20',
                    isOneWay: 'N/A',
                },
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:03Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '43.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '182',
                    mass: '20',
                    isOneWay: 'N/A',
                },
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:06Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '42.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '182',
                    mass: '20',
                    isOneWay: 'N/A',
                },
            ])
        })

        it('returns an array who complete empty message not according to icao and with many planes', () => {
            const json = droneCsvToJson(
              'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundspeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
              `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A\n`+
              `DRONE2;BBBBBB;2023-10-02T08:00:01Z;;;1;46.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A\n`+
              `DRONE1;AAAAAA;2023-10-02T08:00:03Z;;;1;;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;182;20;N/A\n`+
              `DRONE1;AAAAAA;2023-10-02T08:00:06Z;;;1;42.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;182;20;N/A`,
              {mustMerge: true}
            )
            assert.deepStrictEqual(json, [
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:01Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '43.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '180',
                    mass: '20',
                    isOneWay: 'N/A',
                },
                {
                    name: 'DRONE2',
                    icao24: 'BBBBBB',
                    date: '2023-10-02T08:00:01Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '46.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '180',
                    mass: '20',
                    isOneWay: 'N/A',
                },
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:03Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '43.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '182',
                    mass: '20',
                    isOneWay: 'N/A',
                },
                {
                    name: 'DRONE1',
                    icao24: 'AAAAAA',
                    date: '2023-10-02T08:00:06Z',
                    fixName: '',
                    significantPoint: '',
                    timeElapsed: '1',
                    'position.latitude': '42.6138206887089',
                    'position.longitude': '1.401640313032366',
                    'position.altitude': '10.84251968503937',
                    altitudeMax: '57094.800177084115',
                    airSpeed: '0',
                    cas: '0',
                    mach: '0',
                    heading: '180',
                    groundspeed: '0',
                    distanceToNextWaypoint: '0',
                    flownDistance: '0',
                    'wind.eastward': '0',
                    'wind.northward': '0',
                    'wind.upward': '0',
                    route: '182',
                    mass: '20',
                    isOneWay: 'N/A',
                },
            ])
        })
    })
})
