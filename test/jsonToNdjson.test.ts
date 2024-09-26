import { describe } from 'mocha'
import assert from 'assert'
import { jsonToNdjson } from '../src/jsonToNdjson'

describe('jsonToNdjson', () => {
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

  context('when JSON data are valid', () => {
    it('returns NDJSON', async () => {
      assert.deepStrictEqual(
        jsonToNdjson([jsonMessage]),
        JSON.stringify(jsonMessage)
      )
    })

    it('returns default field for if a property is missing', async () => {
      assert.deepStrictEqual(
        jsonToNdjson(
          [
            {
              hexIdent: jsonMessage.hexIdent,
              dateMessageGenerated: jsonMessage.dateMessageGenerated,
              timeMessageGenerated: jsonMessage.timeMessageGenerated,
            },
          ]
        ),
        JSON.stringify({hexIdent: jsonMessage.hexIdent, dateMessageGenerated: jsonMessage.dateMessageGenerated, timeMessageGenerated: jsonMessage.timeMessageGenerated}),
      )
    })
  })
})
