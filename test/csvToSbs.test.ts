import { describe } from 'mocha'
import assert from 'assert'
import { csvToSbs } from '../src'

describe('csvToSbs', () => {
  context('when CSV data are not valid', () => {
    it('returns empty string if timestamp is missing', async () => {
      assert.deepStrictEqual(
        csvToSbs(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
            ',39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400',
        ),
        '',
      )
    })

    it('returns empty string if ICAO is missing', async () => {
      assert.deepStrictEqual(
        csvToSbs(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
            '1695215918,,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400',
        ),
        '',
      )
    })
  })

  context('when CSV data are valid', () => {
    const timestamp = '1672575671'
    const icao24 = '39c902'
    const latitude = '43.289794921875'
    const longitude = '5.40233523346657'
    const groundspeed = '3.450995263850706'
    const track = '296.565051177078'
    const vertical_rate = '5.85216'
    const callsign = 'SAMU13'
    const onground = 'True'
    const alert = 'True'
    const spi = 'True'
    const squawk = '7700'
    const altitude = '-45.72'
    const geoaltitude = '121.92'
    const lastcontact = '1672575670.797'
    const last_position = '1672575670.76'
    const hour = '1672574400'

    it('returns SBS message', async () => {
      assert.deepStrictEqual(
        csvToSbs(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
            `${timestamp},${icao24},${latitude},${longitude},${groundspeed},${track},${vertical_rate},${callsign},${onground},${alert},${spi},${squawk},${altitude},${geoaltitude},${last_position},${lastcontact},${hour}`,
        ),
        `MSG,3,1,1,${icao24},1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,${callsign},${geoaltitude},${groundspeed},${track},${latitude},${longitude},${vertical_rate},${squawk},1,,1,1,{"last_position":"${last_position}","lastcontact":"${lastcontact}","hour":"${hour}","baroaltitude":"-45.72"}`,
      )
    })

    it('uses CSV extra field as SBS message properties if matching', async () => {
      assert.deepStrictEqual(
        csvToSbs(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n' +
            `${timestamp},${icao24},${latitude},${longitude},${groundspeed},${track},${vertical_rate},${callsign},${onground},${alert},${spi},${squawk},${altitude},${geoaltitude},${last_position},${lastcontact},${hour},'{"messageType":"SEL","transmissionType":"2","sessionID":"3","aircraftID":"4","flightID":"5","emergency":"1"}'`,
        ),
        `SEL,2,3,4,${icao24},5,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,${callsign},${geoaltitude},${groundspeed},${track},${latitude},${longitude},${vertical_rate},${squawk},1,1,1,1,{"last_position":"${last_position}","lastcontact":"${lastcontact}","hour":"${hour}","baroaltitude":"-45.72"}`,
      )
    })

    it('returns SBS message with extra fields', async () => {
      assert.deepStrictEqual(
        csvToSbs(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour,extraField\n' +
            `${timestamp},${icao24},${latitude},${longitude},${groundspeed},${track},${vertical_rate},${callsign},${onground},${alert},${spi},${squawk},${altitude},${geoaltitude},${last_position},${lastcontact},${hour},'{"enRoute": "1"}'`,
        ),
        `MSG,3,1,1,${icao24},1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,${callsign},${geoaltitude},${groundspeed},${track},${latitude},${longitude},${vertical_rate},${squawk},1,,1,1,{"last_position":"${last_position}","lastcontact":"${lastcontact}","hour":"${hour}","baroaltitude":"-45.72","enRoute":"1"}`,
      )
    })
  })
})
