import { describe } from 'mocha'
import assert from 'assert'
import { droneCsvToNdjson } from '../src/droneCsvToNdjson'

describe('droneCsvToNdjson', () => {
    context('when CSV drone data are invalid', () => {
        it('returns empty array if date is malformed', () => {
            for (const timestamp of ['', 'not_a_number']) {
                const ndjson = droneCsvToNdjson(
                    'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                    `DRONE1;AAAAAA;${timestamp};;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A`
                )
                assert.deepStrictEqual(ndjson, '')
            }
        })
    })

    context('when CSV drone data are valid', () => {
        it('returns an array', () => {
            const ndjson = droneCsvToNdjson(
                'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A`
            )
            assert.deepStrictEqual(ndjson,
                '{"name":"DRONE1","icao24":"AAAAAA","date":"2023-10-02T08:00:01Z","fixName":"","significantPoint":"","timeElapsed (s)":"1","position.latitude (deg)":"43.6138206887089","position.longitude (deg)":"1.401640313032366","position.altitude (ft)":"10.84251968503937","altitudeMax (ft)":"57094.800177084115","airSpeed (kt)":"0","cas (kt)":"0","mach":"0","heading (deg)":"180","groundSpeed (kt)":"0","distanceToNextWaypoint (NM)":"0","flownDistance (NM)":"0","wind.eastward (kt)":"0","wind.northward (kt)":"0","wind.upward (ft/min)":"0","route (deg)":"180","mass (kg)":"20","isOneWay":"N/A"}',
            )
        })

        it('returns an array with double \\n', () => {
            const ndjson = droneCsvToNdjson(
                'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A\n\n`
            )
            assert.deepStrictEqual(ndjson,
                '{"name":"DRONE1","icao24":"AAAAAA","date":"2023-10-02T08:00:01Z","fixName":"","significantPoint":"","timeElapsed (s)":"1","position.latitude (deg)":"43.6138206887089","position.longitude (deg)":"1.401640313032366","position.altitude (ft)":"10.84251968503937","altitudeMax (ft)":"57094.800177084115","airSpeed (kt)":"0","cas (kt)":"0","mach":"0","heading (deg)":"180","groundSpeed (kt)":"0","distanceToNextWaypoint (NM)":"0","flownDistance (NM)":"0","wind.eastward (kt)":"0","wind.northward (kt)":"0","wind.upward (ft/min)":"0","route (deg)":"180","mass (kg)":"20","isOneWay":"N/A"}',
            )
        })

        it('returns extra fields if present', () => {
            const ndjson = droneCsvToNdjson(
                'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay;extraField\n' +
                `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A;'{"messageType":"MSG","transmissionType":"3","sessionID":"1","aircraftID":"1","flightID":"1","emergency":"0"}'\n`,
                true
            )

            assert.deepStrictEqual(ndjson,
                '{"name":"DRONE1","icao24":"AAAAAA","date":"2023-10-02T08:00:01Z","fixName":"","significantPoint":"","timeElapsed (s)":"1","position.latitude (deg)":"43.6138206887089","position.longitude (deg)":"1.401640313032366","position.altitude (ft)":"10.84251968503937","altitudeMax (ft)":"57094.800177084115","airSpeed (kt)":"0","cas (kt)":"0","mach":"0","heading (deg)":"180","groundSpeed (kt)":"0","distanceToNextWaypoint (NM)":"0","flownDistance (NM)":"0","wind.eastward (kt)":"0","wind.northward (kt)":"0","wind.upward (ft/min)":"0","route (deg)":"180","mass (kg)":"20","isOneWay":"N/A","messageType":"MSG","transmissionType":"3","sessionID":"1","aircraftID":"1","flightID":"1","emergency":"0"}',
            )
        })

        it('does not return no extra fields if empty', async () => {
            const ndjson = droneCsvToNdjson(
                'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                `DRONE1;AAAAAA;2023-10-02T08:00:01Z;;;1;43.6138206887089;1.401640313032366;10.84251968503937;57094.800177084115;0;0;0;180;0;0;0;0;0;0;180;20;N/A\n`,
                true
            )
            assert.deepStrictEqual(ndjson,
                '{"name":"DRONE1","icao24":"AAAAAA","date":"2023-10-02T08:00:01Z","fixName":"","significantPoint":"","timeElapsed (s)":"1","position.latitude (deg)":"43.6138206887089","position.longitude (deg)":"1.401640313032366","position.altitude (ft)":"10.84251968503937","altitudeMax (ft)":"57094.800177084115","airSpeed (kt)":"0","cas (kt)":"0","mach":"0","heading (deg)":"180","groundSpeed (kt)":"0","distanceToNextWaypoint (NM)":"0","flownDistance (NM)":"0","wind.eastward (kt)":"0","wind.northward (kt)":"0","wind.upward (ft/min)":"0","route (deg)":"180","mass (kg)":"20","isOneWay":"N/A"}',
            )
        })
    })
})
