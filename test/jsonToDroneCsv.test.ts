import { describe } from 'mocha'
import assert from 'assert'
import { JsonMessage } from '../src/types'
import {jsonToDroneCsv} from "../src/jsonToDroneCsv";

describe('jsonTodroneCsv', () => {
    const jsonMessage: JsonMessage = {
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
        groundSpeed: '0',
        distanceToNextWaypoint: '0',
        flownDistance: '0',
        'wind.eastward': '0',
        'wind.northward': '0',
        'wind.upward': '0',
        route: '180',
        mass: '20',
        isOneWay: 'N/A',
    }

    context('when JSON data are not valid', () => {
        it('throws an error data are not an array', () => {
            assert.throws(
                () => jsonToDroneCsv(JSON.stringify(jsonMessage)),
                new Error('JSON data must be an array'),
            )
        })

        it('ignores message if date is missing', () => {
            assert.deepStrictEqual(
                jsonToDroneCsv(JSON.stringify([{ ...jsonMessage, date: undefined }])),
                '',
            )
        })

        it('ignores message if ICAO is missing', () => {
            assert.deepStrictEqual(
                jsonToDroneCsv(JSON.stringify([{ ...jsonMessage, icao24: undefined }])),
                '',
            )
        })
    })

    context('when JSON data are valid', () => {
        it('returns CSV drone content', () => {
            assert.deepStrictEqual(
                jsonToDroneCsv(JSON.stringify([jsonMessage])),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
                `${jsonMessage.name};${jsonMessage.icao24};${jsonMessage.date};${jsonMessage.fixName};${jsonMessage.significantPoint};${jsonMessage.timeElapsed};${jsonMessage["position.latitude"]};${jsonMessage["position.longitude"]};${jsonMessage["position.altitude"]};${jsonMessage.altitudeMax};${jsonMessage.airSpeed};${jsonMessage.cas};${jsonMessage.mach};${jsonMessage.heading};${jsonMessage.groundSpeed};${jsonMessage.distanceToNextWaypoint};${jsonMessage.flownDistance};${jsonMessage["wind.eastward"]};${jsonMessage["wind.northward"]};${jsonMessage["wind.upward"]};${jsonMessage.route};${jsonMessage.mass};${jsonMessage.isOneWay}`,
            )
        })


        it('returns empty cells if fields are missing', () => {
            assert.deepStrictEqual(
                jsonToDroneCsv(
                    JSON.stringify([
                        { date: jsonMessage.date, icao24: jsonMessage.icao24 },
                    ]),
                ),
                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay\n' +
                `;${jsonMessage.icao24};${jsonMessage.date};;;;;;;;;;;;;;;;;;;;`,
            )
        })

        it('return extra fields', () => {
            assert.deepStrictEqual(
                jsonToDroneCsv(
                    JSON.stringify([
                        { ...jsonMessage, msgType: '3', transmissionType: 'MSG' },
                    ]),
                    true,
                ),

                'name;icao24;date;fixName;significantPoint;timeElapsed;position.latitude;position.longitude;position.altitude;altitudeMax;airSpeed;cas;mach;heading;groundSpeed;distanceToNextWaypoint;flownDistance;wind.eastward;wind.northward;wind.upward;route;mass;isOneWay;extraField\n' +
                `${jsonMessage.name};${jsonMessage.icao24};${jsonMessage.date};${jsonMessage.fixName};${jsonMessage.significantPoint};${jsonMessage.timeElapsed};${jsonMessage["position.latitude"]};${jsonMessage["position.longitude"]};${jsonMessage["position.altitude"]};${jsonMessage.altitudeMax};${jsonMessage.airSpeed};${jsonMessage.cas};${jsonMessage.mach};${jsonMessage.heading};${jsonMessage.groundSpeed};${jsonMessage.distanceToNextWaypoint};${jsonMessage.flownDistance};${jsonMessage["wind.eastward"]};${jsonMessage["wind.northward"]};${jsonMessage["wind.upward"]};${jsonMessage.route};${jsonMessage.mass};${jsonMessage.isOneWay};'${JSON.stringify({
                    msgType: '3',
                    transmissionType: 'MSG',
                })}'`,
            )
        })
    })
})
