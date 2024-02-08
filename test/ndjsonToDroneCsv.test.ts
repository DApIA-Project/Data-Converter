import { describe } from 'mocha'
import assert from 'assert'
import { JsonMessage } from '../src/types'
import {ndjsonToDroneCsv} from "../src/ndjsonToDroneCsv";

describe('jsonTodroneCsv', () => {
    const jsonMessage: JsonMessage = {
        name: 'DRONE1',
        icao24: 'AAAAAA',
        date: '2023-10-02T08:00:01Z',
        fixName: '',
        significantPoint: '',
        'timeElapsed (s)': '1',
        'position.latitude (deg)': '43.6138206887089',
        'position.longitude (deg)': '1.401640313032366',
        'position.altitude (ft)': '10.84251968503937',
        'altitudeMax (ft)': '57094.800177084115',
        'airSpeed (kt)': '0',
        'cas (kt)': '0',
        mach: '0',
        'heading (deg)': '180',
        'groundSpeed (kt)': '0',
        'distanceToNextWaypoint (NM)': '0',
        'flownDistance (NM)': '0',
        'wind.eastward (kt)': '0',
        'wind.northward (kt)': '0',
        'wind.upward (ft/min)': '0',
        'route (deg)': '180',
        'mass (kg)': '20',
        isOneWay: 'N/A',
    }

    context('when JSON data are not valid', () => {
        it('throws an error data are not NDJSON', () => {
            assert.throws(() =>
                ndjsonToDroneCsv('[\n ' + `${JSON.stringify(jsonMessage)}` + '\n]'),
            )
        })

        it('ignores message if date is missing', () => {
            assert.deepStrictEqual(
                ndjsonToDroneCsv(JSON.stringify({ ...jsonMessage, date: undefined })),
                '',
            )
        })

        it('ignores message if ICAO is missing', () => {
            assert.deepStrictEqual(
                ndjsonToDroneCsv(JSON.stringify({ ...jsonMessage, icao24: undefined })),
                '',
            )
        })
    })

    context('when JSON data are valid', () => {
        it('returns CSV drone content', () => {
            assert.deepStrictEqual(
                ndjsonToDroneCsv(JSON.stringify(jsonMessage)),
                'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                `${jsonMessage.name};${jsonMessage.icao24};${jsonMessage.date};${jsonMessage.fixName};${jsonMessage.significantPoint};${jsonMessage["timeElapsed (s)"]};${jsonMessage["position.latitude (deg)"]};${jsonMessage["position.longitude (deg)"]};${jsonMessage["position.altitude (ft)"]};${jsonMessage["altitudeMax (ft)"]};${jsonMessage["airSpeed (kt)"]};${jsonMessage["cas (kt)"]};${jsonMessage.mach};${jsonMessage["heading (deg)"]};${jsonMessage["groundSpeed (kt)"]};${jsonMessage["distanceToNextWaypoint (NM)"]};${jsonMessage["flownDistance (NM)"]};${jsonMessage["wind.eastward (kt)"]};${jsonMessage["wind.northward (kt)"]};${jsonMessage["wind.upward (ft/min)"]};${jsonMessage["route (deg)"]};${jsonMessage["mass (kg)"]};${jsonMessage.isOneWay}`,
            )
        })


        it('returns empty cells if fields are missing', () => {
            assert.deepStrictEqual(
                ndjsonToDroneCsv(
                    JSON.stringify(
                        { date: jsonMessage.date, icao24: jsonMessage.icao24 },
                    ),
                ),
                'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay\n' +
                `;${jsonMessage.icao24};${jsonMessage.date};;;;;;;;;;;;;;;;;;;;`,
            )
        })

        it('return extra fields', () => {
            assert.deepStrictEqual(
                ndjsonToDroneCsv(
                    JSON.stringify(
                        { ...jsonMessage, msgType: '3', transmissionType: 'MSG' },
                    ),
                    true,
                ),

                'name;icao24;date;fixName;significantPoint;timeElapsed (s);position.latitude (deg);position.longitude (deg);position.altitude (ft);altitudeMax (ft);airSpeed (kt);cas (kt);mach;heading (deg);groundSpeed (kt);distanceToNextWaypoint (NM);flownDistance (NM);wind.eastward (kt);wind.northward (kt);wind.upward (ft/min);route (deg);mass (kg);isOneWay;extraField\n' +
                `${jsonMessage.name};${jsonMessage.icao24};${jsonMessage.date};${jsonMessage.fixName};${jsonMessage.significantPoint};${jsonMessage["timeElapsed (s)"]};${jsonMessage["position.latitude (deg)"]};${jsonMessage["position.longitude (deg)"]};${jsonMessage["position.altitude (ft)"]};${jsonMessage["altitudeMax (ft)"]};${jsonMessage["airSpeed (kt)"]};${jsonMessage["cas (kt)"]};${jsonMessage.mach};${jsonMessage["heading (deg)"]};${jsonMessage["groundSpeed (kt)"]};${jsonMessage["distanceToNextWaypoint (NM)"]};${jsonMessage["flownDistance (NM)"]};${jsonMessage["wind.eastward (kt)"]};${jsonMessage["wind.northward (kt)"]};${jsonMessage["wind.upward (ft/min)"]};${jsonMessage["route (deg)"]};${jsonMessage["mass (kg)"]};${jsonMessage.isOneWay};'${JSON.stringify({
                    msgType: '3',
                    transmissionType: 'MSG',
                })}'`,
            )
        })
    })
})
