import { describe } from 'mocha'
import assert from 'assert'
import { sbsToJson } from '../src'

describe('sbsToJson', () => {
  context('when SBS data are not valid', () => {
    it('returns empty string if date is missing', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1',
        ),
        [],
      )
    })

    it('returns empty string if time is missing', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,2023/01/01,,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1',
        ),
        [],
      )
    })

    it('returns empty string if hexIdent (ICAO) is missing', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1',
        ),
        [],
      )
    })
  })

  context('when SBS data are valid', () => {
    const expectedMessage = {
      messageType: 'MSG',
      transmissionType: 3,
      sessionID: 1,
      aircraftID: 1,
      hexIdent: '39c902',
      flightID: 1,
      dateMessageGenerated: '2023/01/01',
      timeMessageGenerated: '13:21:11.000',
      dateMessageLogged: '2023/01/01',
      timeMessageLogged: '13:21:11.000',
      callsign: 'SAMU13',
      altitude: 121.92,
      groundspeed: 3.450995263850706,
      track: 296.565051177078,
      latitude: 43.289794921875,
      longitude: 5.40233523346657,
      verticalRate: 5.85216,
      alert: true,
      emergency: false,
      spi: true,
      isOnGround: true,
    }

    it('returns JSON message', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1',
        ),
        [expectedMessage],
      )
    })

    it('returns JSON message with double \\n', async () => {
      assert.deepStrictEqual(
          sbsToJson(
              'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n\n',
          ),
          [expectedMessage],
      )
    })

    it('returns JSON message with label', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024',
        ),
        [{ ...expectedMessage, haveLabel: true, label: 1024 }],
      )
    })

    it('returns partial JSON message if optional attributes are missing', async () => {
      assert.deepStrictEqual(
        sbsToJson(',,,,39c902,,2023/01/01,13:21:11.000,,,,,,,,,,,,,,'),
        [
          {
            hexIdent: '39c902',
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:11.000',
          },
        ],
      )
    })

    it('returns JSON message with extra field', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"geoaltitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}',
          {saveExtraField: true},
        ),
        [
          {
            ...expectedMessage,
            geoaltitude: '-45.72',
            last_position: '1672575670.76',
            lastcontact: '1672575670.797',
            hour: '1672574400',
          },
        ],
      )
    })

    it('returns JSON message with extra field without fields last_position, lastcontact and hour', async () => {
      assert.deepStrictEqual(
          sbsToJson(
              'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"geoaltitude":"-45.72"}',
            {saveExtraField: true},
          ),
          [
            {
              ...expectedMessage,
              geoaltitude: '-45.72',
            },
          ],
      )
    })

    it('returns JSON message with label and extra fields', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,1,1024,{"geoaltitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}',
          {saveExtraField: true},
        ),
        [
          {
            ...expectedMessage,
            haveLabel: true,
            label: 1024,
            geoaltitude: '-45.72',
            last_position: '1672575670.76',
            lastcontact: '1672575670.797',
            hour: '1672574400',
          },
        ],
      )
    })

    it('returns an merged array when have 2 messages with same of couple timestamp/icao', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n' +
          'MSG,3,1,,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,,121.92,3.450995263850706,296.565051177078,,5.40233523346657,5.85216,,1,0,1,1\n' +
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,,121.92,3.450995263850706,296.565051177078,42.289794921875,5.40233523346657,5.85216,,1,0,1,1',
          {mustMerge: true},
        ),
        [
          {
            messageType: 'MSG',
            transmissionType: 3,
            sessionID: 1,
            aircraftID: 1,
            hexIdent: '39c902',
            flightID: 1,
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:11.000',
            dateMessageLogged: '2023/01/01',
            timeMessageLogged: '13:21:11.000',
            callsign: 'SAMU13',
            altitude: 121.92,
            groundspeed: 3.450995263850706,
            track: 296.565051177078,
            latitude: 42.289794921875,
            longitude: 5.40233523346657,
            verticalRate: 5.85216,
            alert: true,
            emergency: false,
            spi: true,
            isOnGround: true,
          }
        ],
      )
    })

    it('returns an array who complete empty message not according to icao', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n' +
          'MSG,3,1,,39c902,1,2023/01/01,13:21:13.000,2023/01/01,13:21:13.000,,121.92,3.450995263850706,296.565051177078,,5.40233523346657,5.85216,,1,0,1,1\n' +
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:16.000,2023/01/01,13:21:16.000,SAMU28,121.92,3.450995263850706,296.565051177078,42.289794921875,5.40233523346657,5.85216,,1,0,1,1',
          {mustMerge: true},
        ),
        [
          {
            messageType: 'MSG',
            transmissionType: 3,
            sessionID: 1,
            aircraftID: 1,
            hexIdent: '39c902',
            flightID: 1,
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:11.000',
            dateMessageLogged: '2023/01/01',
            timeMessageLogged: '13:21:11.000',
            callsign: 'SAMU13',
            altitude: 121.92,
            groundspeed: 3.450995263850706,
            track: 296.565051177078,
            latitude: 43.289794921875,
            longitude: 5.40233523346657,
            verticalRate: 5.85216,
            alert: true,
            emergency: false,
            spi: true,
            isOnGround: true,
          },
          {
            messageType: 'MSG',
            transmissionType: 3,
            sessionID: 1,
            aircraftID: 1,
            hexIdent: '39c902',
            flightID: 1,
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:13.000',
            dateMessageLogged: '2023/01/01',
            timeMessageLogged: '13:21:13.000',
            callsign: 'SAMU13',
            altitude: 121.92,
            groundspeed: 3.450995263850706,
            track: 296.565051177078,
            latitude: 43.289794921875,
            longitude: 5.40233523346657,
            verticalRate: 5.85216,
            alert: true,
            emergency: false,
            spi: true,
            isOnGround: true,
          },
          {
            messageType: 'MSG',
            transmissionType: 3,
            sessionID: 1,
            aircraftID: 1,
            hexIdent: '39c902',
            flightID: 1,
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:16.000',
            dateMessageLogged: '2023/01/01',
            timeMessageLogged: '13:21:16.000',
            callsign: 'SAMU28',
            altitude: 121.92,
            groundspeed: 3.450995263850706,
            track: 296.565051177078,
            latitude: 42.289794921875,
            longitude: 5.40233523346657,
            verticalRate: 5.85216,
            alert: true,
            emergency: false,
            spi: true,
            isOnGround: true,
          }
        ],
      )
    })
    it('returns an array who complete empty message not according to icao and with many planes', async () => {
      assert.deepStrictEqual(
        sbsToJson(
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n' +
          'MSG,3,1,1,12a234,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU25,121.92,2.450995263850706,296.565051177078,41.289794921875,4.40233523346657,5.85216,,1,0,1,1\n' +
          'MSG,3,1,,39c902,1,2023/01/01,13:21:13.000,2023/01/01,13:21:13.000,,121.92,3.450995263850706,296.565051177078,,5.40233523346657,5.85216,,1,0,1,1\n' +
          'MSG,3,1,1,39c902,1,2023/01/01,13:21:16.000,2023/01/01,13:21:16.000,SAMU28,121.92,3.450995263850706,296.565051177078,42.289794921875,5.40233523346657,5.85216,,1,0,1,1',
          {mustMerge: true},
        ),
        [
          {
            messageType: 'MSG',
            transmissionType: 3,
            sessionID: 1,
            aircraftID: 1,
            hexIdent: '39c902',
            flightID: 1,
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:11.000',
            dateMessageLogged: '2023/01/01',
            timeMessageLogged: '13:21:11.000',
            callsign: 'SAMU13',
            altitude: 121.92,
            groundspeed: 3.450995263850706,
            track: 296.565051177078,
            latitude: 43.289794921875,
            longitude: 5.40233523346657,
            verticalRate: 5.85216,
            alert: true,
            emergency: false,
            spi: true,
            isOnGround: true,
          },
          {
            messageType: 'MSG',
            transmissionType: 3,
            sessionID: 1,
            aircraftID: 1,
            hexIdent: '12a234',
            flightID: 1,
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:11.000',
            dateMessageLogged: '2023/01/01',
            timeMessageLogged: '13:21:11.000',
            callsign: 'SAMU25',
            altitude: 121.92,
            groundspeed: 2.450995263850706,
            track: 296.565051177078,
            latitude: 41.289794921875,
            longitude: 4.40233523346657,
            verticalRate: 5.85216,
            alert: true,
            emergency: false,
            spi: true,
            isOnGround: true,
          },
          {
            messageType: 'MSG',
            transmissionType: 3,
            sessionID: 1,
            aircraftID: 1,
            hexIdent: '39c902',
            flightID: 1,
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:13.000',
            dateMessageLogged: '2023/01/01',
            timeMessageLogged: '13:21:13.000',
            callsign: 'SAMU13',
            altitude: 121.92,
            groundspeed: 3.450995263850706,
            track: 296.565051177078,
            latitude: 43.289794921875,
            longitude: 5.40233523346657,
            verticalRate: 5.85216,
            alert: true,
            emergency: false,
            spi: true,
            isOnGround: true,
          },
          {
            messageType: 'MSG',
            transmissionType: 3,
            sessionID: 1,
            aircraftID: 1,
            hexIdent: '39c902',
            flightID: 1,
            dateMessageGenerated: '2023/01/01',
            timeMessageGenerated: '13:21:16.000',
            dateMessageLogged: '2023/01/01',
            timeMessageLogged: '13:21:16.000',
            callsign: 'SAMU28',
            altitude: 121.92,
            groundspeed: 3.450995263850706,
            track: 296.565051177078,
            latitude: 42.289794921875,
            longitude: 5.40233523346657,
            verticalRate: 5.85216,
            alert: true,
            emergency: false,
            spi: true,
            isOnGround: true,
          }
        ],
      )
    })
  })
})
