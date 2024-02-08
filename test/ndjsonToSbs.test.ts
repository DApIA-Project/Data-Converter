import { describe } from 'mocha'
import assert from 'assert'
import { ndjsonToSbs } from '../src/ndjsonToSbs'

describe('ndjsonToSbs', () => {
  const jsonMessage = {
    dateMessageGenerated: '2016/12/09',
    timeMessageGenerated: '09:13:34.120',
    dateMessageLogged: '2016/12/09',
    timeMessageLogged: '09:13:35.077',
    hexIdent: '34648e',
    aircraftID: 1,
    messageType: 'MSG',
    transmissionType: 3,
    sessionID: 4,
    flightID: 5,
    callsign: 'SWN5614',
    altitude: 7450.0,
    groundspeed: 291.0,
    track: 355.66173320857183,
    latitude: 43.84039306640625,
    longitude: 1.292171034702035,
    verticalRate: 2752.0,
    squawk: 1000,
    alert: true,
    spi: true,
    emergency: false,
    isOnGround: false,
  }

  context('when JSON data are invalid', () => {
    it('throws an error data are not NDJSON', () => {
      assert.throws(() =>
        ndjsonToSbs('[\n ' + `${JSON.stringify(jsonMessage)}` + '\n]'),
      )
    })

    it('returns empty string if datetime is missing', async () => {
      const sbsContent: string = ndjsonToSbs(
        JSON.stringify({
          ...jsonMessage,
          dateMessageGenerated: undefined,
          timeMessageGenerated: undefined,
        }),
      )
      assert.deepStrictEqual(sbsContent, '')
    })

    it('returns empty string if hexIdent (ICAO) is missing', async () => {
      const sbsContent: string = ndjsonToSbs(
        JSON.stringify({ ...jsonMessage, hexIdent: undefined }),
      )
      assert.deepStrictEqual(sbsContent, '')
    })
  })

  context('when JSON data are valid', () => {
    it('returns SBS', async () => {
      assert.deepStrictEqual(
        ndjsonToSbs(JSON.stringify(jsonMessage)),
        `${jsonMessage.messageType},` +
          `${jsonMessage.transmissionType},` +
          `${jsonMessage.sessionID},` +
          `${jsonMessage.aircraftID},` +
          `${jsonMessage.hexIdent},` +
          `${jsonMessage.flightID},` +
          `${jsonMessage.dateMessageGenerated},` +
          `${jsonMessage.timeMessageGenerated},` +
          `${jsonMessage.dateMessageLogged},` +
          `${jsonMessage.timeMessageLogged},` +
          `${jsonMessage.callsign},` +
          `${jsonMessage.altitude},` +
          `${jsonMessage.groundspeed},` +
          `${jsonMessage.track},` +
          `${jsonMessage.latitude},` +
          `${jsonMessage.longitude},` +
          `${jsonMessage.verticalRate},` +
          `${jsonMessage.squawk},` +
          '1,0,1,0',
      )
    })

    it('returns default field for if a property is missing', async () => {
      assert.deepStrictEqual(
        ndjsonToSbs(
          JSON.stringify({
            hexIdent: jsonMessage.hexIdent,
            dateMessageGenerated: jsonMessage.dateMessageGenerated,
            timeMessageGenerated: jsonMessage.timeMessageGenerated,
          }),
        ),
        'MSG,3,1,1,' +
          `${jsonMessage.hexIdent},` +
          '1,' +
          `${jsonMessage.dateMessageGenerated},` +
          `${jsonMessage.timeMessageGenerated},` +
          `${jsonMessage.dateMessageGenerated},` +
          `${jsonMessage.timeMessageGenerated},,,,,,,,,,,,`,
      )
    })
  })
})
