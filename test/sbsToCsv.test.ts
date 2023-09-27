import { describe } from 'mocha'
import assert from 'assert'
import { sbsToCsv } from '../src'

describe('sbsToCsv', () => {
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

  context('when SBS data are not valid', () => {
    it('returns empty string if generated date is missing', async () => {
      assert.deepStrictEqual(
        sbsToCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},,${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
        ),
        '',
      )
    })

    it('returns empty string if generated time is missing', async () => {
      assert.deepStrictEqual(
        sbsToCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
        ),
        '',
      )
    })

    it('returns empty string if hexIdent (ICAO) is missing', async () => {
      assert.deepStrictEqual(
        sbsToCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},,${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
        ),
        '',
      )
    })
  })

  context('when SBS data are valid', () => {
    it('returns CSV message', async () => {
      assert.deepStrictEqual(
        sbsToCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
        ),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n' +
          `1672579271,${hexIdent},${latitude},${longitude},${groundSpeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude},,,,'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false}'`,
      )
    })

    it('returns CSV message with extra fields', async () => {
      assert.deepStrictEqual(
        sbsToCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundSpeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround},{"enRoute":"1"}`,
        ),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n' +
          `1672579271,${hexIdent},${latitude},${longitude},${groundSpeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude},,,,'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false,"enRoute":"1"}'`,
      )
    })
  })
})
