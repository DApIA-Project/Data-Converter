import { describe } from 'mocha'
import assert from 'assert'
import { sbsToOpenskyCsv } from '../src'

describe('sbsToOpenskyCsv', () => {
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
  const groundspeed = '265.8'
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
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},,${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
          {saveExtraField: true}),
        '',
      )
    })

    it('returns empty string if generated time is missing', async () => {
      assert.deepStrictEqual(
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
          {saveExtraField: true}),
        '',
      )
    })

    it('returns empty string if hexIdent (ICAO) is missing', async () => {
      assert.deepStrictEqual(
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},,${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
          {saveExtraField: true}),
        '',
      )
    })
  })

  context('when SBS data are valid', () => {
    it('returns CSV Opensky message', async () => {
      assert.deepStrictEqual(
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
          {saveExtraField: true}),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,extraField\n' +
          `1672579271,${hexIdent},${latitude},${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude},'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false}'`,
      )
    })

    it('returns CSV Opensky message with double \\n', async () => {
      assert.deepStrictEqual(
          sbsToOpenskyCsv(
              `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n\n`,
            {saveExtraField: true}),
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,extraField\n' +
          `1672579271,${hexIdent},${latitude},${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude},'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false}'`,
      )
    })

    it('uses extra fields as CSV Opensky message properies if matching', async () => {
      assert.deepStrictEqual(
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround},{"baroaltitude":"-45.5"}`,
          {saveExtraField: true}),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,extraField\n' +
          `1672579271,${hexIdent},${latitude},${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,-45.5,${altitude},'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false}'`,
      )
    })

    it('returns CSV Opensky message with extra fields', async () => {
      assert.deepStrictEqual(
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround},{"last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400","enRoute":"1"}`,
          {saveExtraField: true}),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n' +
          `1672579271,${hexIdent},${latitude},${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude},1672575670.76,1672575670.797,1672574400,'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false,"enRoute":"1"}'`,
      )
    })

    it('returns CSV Opensky message with extra fields without fields last_position, lastcontact and hour', async () => {
      assert.deepStrictEqual(
          sbsToOpenskyCsv(
              `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround},{"enRoute":"1"}`,
            {saveExtraField: true}),
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,extraField\n' +
          `1672579271,${hexIdent},${latitude},${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude},'{"aircraftID":${aircraftID},"messageType":"${messageType}","transmissionType":${transmissionType},"sessionID":${sessionID},"flightID":${flightID},"emergency":false,"enRoute":"1"}'`,
      )
    })

    it('returns CSV Opensky message with extra fields to false', async () => {
      assert.deepStrictEqual(
          sbsToOpenskyCsv(
              `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround},{"last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400","enRoute":"1"}`),
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
          `1672579271,${hexIdent},${latitude},${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude},1672575670.76,1672575670.797,1672574400`,
      )
    })

    it('returns CSV Opensky merged message when have 2 messages with same of couple timestamp/icao', async () => {
      assert.deepStrictEqual(
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n`+
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},13:21:11.234,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},,5.5023,${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n`+
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},13:21:11.754,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},43.5656556,,${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
          {saveExtraField: false, mustMerge:true }),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude\n' +
        `1672579271,${hexIdent},43.5656556,5.5023,${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude}`,
      )
    })

    it('returns CSV Opensky merged message who complete empty message not according to icao', async () => {
      assert.deepStrictEqual(
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n`+
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},13:21:13.234,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},,5.5023,${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n`+
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},13:21:16.754,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},43.5656556,,${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
          {saveExtraField: false, mustMerge:true }),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude\n' +
        `1672579271,${hexIdent},${latitude},${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude}\n` +
        `1672579273,${hexIdent},${latitude},5.5023,${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude}\n` +
        `1672579276,${hexIdent},43.5656556,5.5023,${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude}`,
      )
    })

    it('returns CSV Opensky merged message who complete empty message not according to icao and with many planes', async () => {
      assert.deepStrictEqual(
        sbsToOpenskyCsv(
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},${latitude},${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n`+
          `${messageType},${transmissionType},${sessionID},${aircraftID},23d543,${flightID},${dateMessageGenerated},${timeMessageGenerated},${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},42.999999,${longitude},${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n`+
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},13:21:13.234,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},,5.5023,${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}\n`+
          `${messageType},${transmissionType},${sessionID},${aircraftID},${hexIdent},${flightID},${dateMessageGenerated},13:21:16.754,${dateMessageLogged},${timeMessageLogged},${callsign},${altitude},${groundspeed},${track},43.5656556,,${verticalRate},${squawk},${alert},${emergency},${spi},${isOnGround}`,
          {saveExtraField: false, mustMerge:true }),
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude\n' +
        `1672579271,${hexIdent},${latitude},${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude}\n` +
        `1672579271,23d543,42.999999,${longitude},${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude}\n` +
        `1672579273,${hexIdent},${latitude},5.5023,${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude}\n` +
        `1672579276,${hexIdent},43.5656556,5.5023,${groundspeed},${track},${verticalRate},${callsign},True,True,True,,,${altitude}`,
      )
    })
  })
})
