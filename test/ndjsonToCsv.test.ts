import { describe } from 'mocha'
import assert from 'assert'
import { ndjsonToCsv } from '../src/ndjsonToCsv'

describe('ndjsonToCsv', () => {
  const jsonMessage: Record<string, string> = {
    timestamp: '1695026360123',
    geoaltitude: '125.2',
    icao24: '39c902',
    callsign: 'SWN5614',
    altitude: '7450.0',
    groundspeed: '291.0',
    track: '355.66173320857183',
    latitude: '43.84039306640625',
    longitude: '1.292171034702035',
    vertical_rate: '2752.0',
    squawk: '1000',
    alert: '1',
    spi: '0',
    onground: '0',
    last_position: 'location',
    lastcontact: '5',
    hour: '1',
  }

  context('when JSON data are not valid', () => {
    it('throws an error data are not NDJSON', () => {
      assert.throws(() =>
        ndjsonToCsv('[\n ' + `${JSON.stringify(jsonMessage)}` + '\n]'),
      )
    })

    it('ignores message if date is missing', () => {
      assert.deepStrictEqual(
        ndjsonToCsv(JSON.stringify({ ...jsonMessage, timestamp: undefined })),
        '',
      )
    })

    it('ignores message if ICAO is missing', () => {
      assert.deepStrictEqual(
        ndjsonToCsv(JSON.stringify({ ...jsonMessage, icao24: undefined })),
        '',
      )
    })
  })

  context('when JSON data are valid', () => {
    it('returns CSV content', () => {
      assert.deepStrictEqual(
        ndjsonToCsv(JSON.stringify(jsonMessage)),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
          `${jsonMessage.timestamp},${jsonMessage.icao24},${jsonMessage.latitude},${jsonMessage.longitude},${jsonMessage.groundspeed},${jsonMessage.track},${jsonMessage.vertical_rate},${jsonMessage.callsign},${jsonMessage.onground},${jsonMessage.alert},${jsonMessage.spi},${jsonMessage.squawk},${jsonMessage.altitude},${jsonMessage.geoaltitude},${jsonMessage.last_position},${jsonMessage.lastcontact},${jsonMessage.hour}`,
      )
    })

    it('returns empty cells if fields are missing', () => {
      assert.deepStrictEqual(
        ndjsonToCsv(
          JSON.stringify({
            timestamp: jsonMessage.timestamp,
            icao24: jsonMessage.icao24,
          }),
        ),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
          `${jsonMessage.timestamp},${jsonMessage.icao24},,,,,,,,,,,,,,,`,
      )
    })

    it('return extra fields', () => {
      assert.deepStrictEqual(
        ndjsonToCsv(
          JSON.stringify({
            ...jsonMessage,
            msgType: '3',
            transmissionType: 'MSG',
          }),
          true,
        ),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n' +
          `${jsonMessage.timestamp},${jsonMessage.icao24},${
            jsonMessage.latitude
          },${jsonMessage.longitude},${jsonMessage.groundspeed},${
            jsonMessage.track
          },${jsonMessage.vertical_rate},${jsonMessage.callsign},${
            jsonMessage.onground
          },${jsonMessage.alert},${jsonMessage.spi},${jsonMessage.squawk},${
            jsonMessage.altitude
          },${jsonMessage.geoaltitude},${jsonMessage.last_position},${
            jsonMessage.lastcontact
          },${jsonMessage.hour},"${JSON.stringify({
            msgType: '3',
            transmissionType: 'MSG',
          })}"`,
      )
    })
  })
})
