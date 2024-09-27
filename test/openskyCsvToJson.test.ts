import { describe } from 'mocha'
import assert from 'assert'
import { openskyCsvToJson } from '../src'

describe('openskyCsvToJson', () => {
  context('when CSV Opensky data are invalid', () => {
    it('returns empty array if timestamp is malformed', () => {
      for (const timestamp of ['', 'not_a_number']) {
        const json = openskyCsvToJson(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
            `${timestamp},39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400`,
        )
        assert.deepStrictEqual(json, [])
      }
    })
  })

  context('when CSV Opensky data are valid', () => {
    it('returns an array', () => {
      const json = openskyCsvToJson(
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

    it('returns an array with double \\n', () => {
      const json = openskyCsvToJson(
          'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
          '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n\n',
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
      const json = openskyCsvToJson(
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
      const json = openskyCsvToJson(
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour,extraField\n' +
          `1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400,'{"messageType":"MSG","transmissionType":"3","sessionID":"1","aircraftID":"1","flightID":"1","emergency":"0"}'`,
        {saveExtraField: true},
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
      const json = openskyCsvToJson(
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
          '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400',
        {saveExtraField: true},
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

    it('returns an merged array when have 2 messages with same of couple timestamp/icao', () => {
      const json = openskyCsvToJson(
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n' +
        '1672575671,39c902,,5.40233523346657,3.450995263850706,,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574405\n' +
        '1672575671,39c902,42.5656565656,5.40233523346657,3.450995263850706,,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,',
        {mustMerge: true}
      )
      assert.deepStrictEqual(json, [
        {
          timestamp: '1672575671',
          icao24: '39c902',
          latitude: '42.5656565656',
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
          hour: '1672574405',
        },
      ])
    })

    it('returns an array who complete empty message not according to icao', () => {
      const json = openskyCsvToJson(
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n' +
        '1672575673,39c902,,5.40233523346657,3.450995263850706,,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574405\n' +
        '1672575675,39c902,42.5656565656,5.40233523346657,3.450995263850706,,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,',
        {mustMerge: true}
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
        {
          timestamp: '1672575673',
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
          hour: '1672574405',
        },
        {
          timestamp: '1672575675',
          icao24: '39c902',
          latitude: '42.5656565656',
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
          hour: '1672574405',
        },
      ])
    })

    it('returns an array who complete empty message not according to icao and with many planes', () => {
      const json = openskyCsvToJson(
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,lastposupdate,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n' +
        '1672575671,23b567,43.222222222222,5.11111111111111,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574402\n' +
        '1672575673,39c902,,5.40233523346657,3.450995263850706,,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574405\n' +
        '1672575675,39c902,42.5656565656,5.40233523346657,3.450995263850706,,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,',
        {mustMerge: true}
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
        {
          timestamp: '1672575671',
          icao24: '23b567',
          latitude: '43.222222222222',
          longitude: '5.11111111111111',
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
          hour: '1672574402',
        },
        {
          timestamp: '1672575673',
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
          hour: '1672574405',
        },
        {
          timestamp: '1672575675',
          icao24: '39c902',
          latitude: '42.5656565656',
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
          hour: '1672574405',
        },
      ])
    })

  })
})
