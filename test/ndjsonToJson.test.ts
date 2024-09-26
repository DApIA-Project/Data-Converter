import { describe } from 'mocha'
import assert from 'assert'
import { JsonMessage } from '../src/types'
import { ndjsonToJson } from '../src/ndjsonToJson'

describe('ndjsonToJson', () => {
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
    groundspeed: '0',
    distanceToNextWaypoint: '0',
    flownDistance: '0',
    'wind.eastward': '0',
    'wind.northward': '0',
    'wind.upward': '0',
    route: '180',
    mass: '20',
    isOneWay: 'N/A',
  }

  context('when NDJSON data are not valid', () => {
    it('throws an error data are not NDJSON', () => {
      assert.throws(() =>
        ndjsonToJson('[\n ' + `${JSON.stringify(jsonMessage)}` + '\n]'),
      )
    })
  })

  context('when NDJSON data are valid', () => {
    it('returns CSV drone content', () => {
      console.log(JSON.stringify(jsonMessage))
      assert.deepStrictEqual(
        ndjsonToJson(JSON.stringify(jsonMessage)),
        JSON.stringify([jsonMessage]))
    })


    it('returns empty cells if fields are missing', () => {
      assert.deepStrictEqual(
        ndjsonToJson(
          JSON.stringify(
            { date: jsonMessage.date, icao24: jsonMessage.icao24 },
          ),
        ),
        JSON.stringify([{date: jsonMessage.date, icao24: jsonMessage.icao24}]))
    })

    it('return extra fields', () => {
      assert.deepStrictEqual(
        ndjsonToJson(
          JSON.stringify(
            { ...jsonMessage, msgType: '3', transmissionType: 'MSG' },
          ),
          {saveExtraField: true},
        ),
        JSON.stringify([{...jsonMessage, msgType: '3', transmissionType: 'MSG' }])
      )
    })
  })
})
