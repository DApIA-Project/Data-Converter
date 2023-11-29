import { describe } from 'mocha'
import assert from 'assert'
import { csvToJson } from '../src/csvToJson'

describe('csvToJson', () => {
  context('when CSV data are invalid', () => {
    it('returns empty array if timestamp is malformed', () => {
      for (const timestamp of ['', 'not_a_number']) {
        const json = csvToJson(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
            `${timestamp},39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400`,
        )
        assert.deepStrictEqual(json, [])
      }
    })
  })

  context('when CSV data are valid', () => {
    it('returns an array', () => {
      const json = csvToJson(
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
          '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400',
      )
      assert.deepStrictEqual(json, [
        {
          timestamp: '1672575671',
          icao24: '39c902',
          latitude: '43.289794921875',
          longitude: '5.40233523346657',
          groundspeed: '3.450995263850706',
          track: '296.565051177078',
          vertical_rate: '5.85216',
          callsign: 'SAMU13',
          onground: 'True',
          alert: 'True',
          spi: 'True',
          squawk: 'NaN',
          altitude: '-45.72',
          geoaltitude: '121.92',
          lastposupdate: '1672575670.76',
          lastcontact: '1672575670.797',
          hour: '1672574400',
        },
      ])
    })

    it('returns an array without fields last_position, lastcontact and hour', () => {
      const json = csvToJson(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude\n' +
          '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92',
      )
      assert.deepStrictEqual(json, [
        {
          timestamp: '1672575671',
          icao24: '39c902',
          latitude: '43.289794921875',
          longitude: '5.40233523346657',
          groundspeed: '3.450995263850706',
          track: '296.565051177078',
          vertical_rate: '5.85216',
          callsign: 'SAMU13',
          onground: 'True',
          alert: 'True',
          spi: 'True',
          squawk: 'NaN',
          altitude: '-45.72',
          geoaltitude: '121.92',
        },
      ])
    })

    it('returns extra fields if present', () => {
      const json = csvToJson(
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n' +
          `1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{"messageType":"MSG","transmissionType":"3","sessionID":"1","aircraftID":"1","flightID":"1","emergency":"0"}'`,
        true,
      )
      assert.deepStrictEqual(json, [
        {
          timestamp: '1672575671',
          icao24: '39c902',
          latitude: '43.289794921875',
          longitude: '5.40233523346657',
          groundspeed: '3.450995263850706',
          track: '296.565051177078',
          vertical_rate: '5.85216',
          callsign: 'SAMU13',
          onground: 'True',
          alert: 'True',
          spi: 'True',
          squawk: 'NaN',
          altitude: '-45.72',
          geoaltitude: '121.92',
          lastposupdate: '1672575670.76',
          lastcontact: '1672575670.797',
          hour: '1672574400',
          messageType: 'MSG',
          transmissionType: '3',
          sessionID: '1',
          aircraftID: '1',
          flightID: '1',
          emergency: '0',
        },
      ])
    })

    it('does not return no extra fields if empty', async () => {
      const json = csvToJson(
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
          '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400',
        true,
      )
      assert.deepStrictEqual(json, [
        {
          timestamp: '1672575671',
          icao24: '39c902',
          latitude: '43.289794921875',
          longitude: '5.40233523346657',
          groundspeed: '3.450995263850706',
          track: '296.565051177078',
          vertical_rate: '5.85216',
          callsign: 'SAMU13',
          onground: 'True',
          alert: 'True',
          spi: 'True',
          squawk: 'NaN',
          altitude: '-45.72',
          geoaltitude: '121.92',
          lastposupdate: '1672575670.76',
          lastcontact: '1672575670.797',
          hour: '1672574400',
        },
      ])
    })
  })
})
