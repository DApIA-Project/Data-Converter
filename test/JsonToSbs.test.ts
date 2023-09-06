import { describe } from 'mocha'
import assert from 'assert'
import { convertJSONtoSBS } from '../src/JsonToSbs'

describe('JsonToSbs', () => {
  const jsonMessage: Record<string, string> = {
    timestamp: '1659127350',
    icao24: '34648e',
    latitude: '43.84039306640625',
    longitude: '1.292171034702035',
    groundspeed: '291.0',
    track: '355.66173320857183',
    vertical_rate: '2752.0',
    callsign: 'SWN5614',
    onground: '0',
    alert: '1',
    spi: '1',
    squawk: '1000',
    altitude: '7450.0',
    geoaltitude: '7450.0',
    last_position: '',
    lastcontact: '',
    hour: '',
  }

  context('when JSON data are invalid', () => {
    it('returns empty string if timestamp and datetime are missing', async () => {
      const malformedMessage = jsonMessage
      delete malformedMessage.timestamp
      const sbsContent: string = convertJSONtoSBS([malformedMessage])
      assert.deepStrictEqual(sbsContent, '')
    })

    it('returns empty string if icao is missing', async () => {
      const malformedMessage = jsonMessage
      delete malformedMessage.icao
      const sbsContent: string = convertJSONtoSBS([malformedMessage])
      assert.deepStrictEqual(sbsContent, '')
    })

    it('returns empty string if label is missing', async () => {
      const malformedMessage = { ...jsonMessage, haveLabel: '1' }
      const sbsContent: string = convertJSONtoSBS([malformedMessage])
      assert.deepStrictEqual(sbsContent, '')
    })

    it('returns empty string if haveLabel is missing', async () => {
      const malformedMessage = { ...jsonMessage, label: '1' }
      const sbsContent: string = convertJSONtoSBS([malformedMessage])
      assert.deepStrictEqual(sbsContent, '')
    })
  })

  context('when JSON data are valid', () => {
    // TODO: fix me
    it.skip('returns SBS', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([jsonMessage]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,0,0,1,0\n',
      )
    })

    it('returns sbs content when json content is valid with undefined squawk value', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
          },
        ]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with empty squawk value', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: '',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
          },
        ]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with NaN squawk value', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
          },
        ]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with message type present', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
            messageType: 'STA',
          },
        ]),
        'STA,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with transmission type present', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
            transmissionType: '5',
          },
        ]),
        'MSG,5,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with sessionID present', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
            sessionID: '2022',
          },
        ]),
        'MSG,3,2022,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with aircraftID present', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
            aircraftID: '2022',
          },
        ]),
        'MSG,3,1,2022,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with flightID present', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
            flightID: '2022',
          },
        ]),
        'MSG,3,1,1,34648e,2022,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with aircraftID present second time', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
          },
          {
            timestamp: '1659127351',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
          },
        ]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n' +
          'MSG,3,1,1,34648e,1,2022/07/29,20:42:31.000,2022/07/29,20:42:31.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with label', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: '0',
            alert: '0',
            spi: '1',
            squawk: '1000',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
            haveLabel: '1',
            label: '1024',
          },
        ]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,0,0,1,0,1,1024\n',
      )
    })

    it('returns sbs content when json content is valid with many undefined attributes', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            onground: '0',
            alert: '0',
            spi: '1',
            squawk: '1000',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
          },
        ]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,,7450.0,,,,,,1000,0,0,1,0\n',
      )
    })

    it('returns sbs content when json content is valid with emergency present', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
            emergency: '1',
          },
        ]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,1,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with date and time present', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS([
          {
            timestamp: '1659127350',
            icao24: '34648e',
            latitude: '43.84039306640625',
            longitude: '1.292171034702035',
            groundspeed: '291.0',
            track: '355.66173320857183',
            vertical_rate: '2752.0',
            callsign: 'SWN5614',
            onground: 'True',
            alert: 'True',
            squawk: 'NaN',
            altitude: '7450.0',
            geoaltitude: '7450.0',
            last_position: '',
            lastcontact: '',
            hour: '',
            dateMessageGenerated: '2022/07/29',
            timeMessageGenerated: '20:42:30.000',
            dateMessageLogged: '2022/07/29',
            timeMessageLogged: '20:42:30.000',
          },
        ]),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1\n',
      )
    })

    it('returns sbs content when json content is valid with extraField with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: '0',
              alert: '0',
              spi: '1',
              squawk: '1000',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,0,0,1,0,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with False for boolean value with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'False',
              alert: 'False',
              spi: 'False',
              squawk: '1000',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,0,0,0,0,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with True for boolean value with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              spi: 'True',
              squawk: '1000',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,1,0,1,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with undefined boolean value with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: '1000',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with undefined squawk value with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with empty squawk value with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: '',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with NaN squawk value with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with message type present with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
              messageType: 'STA',
            },
          ],
          true,
        ),
        'STA,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with transmission type present with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
              transmissionType: '5',
            },
          ],
          true,
        ),
        'MSG,5,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with sessionID present with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
              sessionID: '2022',
            },
          ],
          true,
        ),
        'MSG,3,2022,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with aircraftID present with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
              aircraftID: '2022',
            },
          ],
          true,
        ),
        'MSG,3,1,2022,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with flightID present with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
              flightID: '2022',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,2022,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with aircraftID present second time with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
            {
              timestamp: '1659127351',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n' +
          'MSG,3,1,1,34648e,1,2022/07/29,20:42:31.000,2022/07/29,20:42:31.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with label with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: '0',
              alert: '0',
              spi: '1',
              squawk: '1000',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
              haveLabel: '1',
              label: '1024',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,1000,0,0,1,0,1,1024,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with many undefined attributes with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              onground: '0',
              alert: '0',
              spi: '1',
              squawk: '1000',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,,7450.0,,,,,,1000,0,0,1,0,{"last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with emergency present with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
              emergency: '1',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,1,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })

    it('returns sbs content when json content is valid with date and time present with extraField', async () => {
      assert.deepStrictEqual(
        convertJSONtoSBS(
          [
            {
              timestamp: '1659127350',
              icao24: '34648e',
              latitude: '43.84039306640625',
              longitude: '1.292171034702035',
              groundspeed: '291.0',
              track: '355.66173320857183',
              vertical_rate: '2752.0',
              callsign: 'SWN5614',
              onground: 'True',
              alert: 'True',
              squawk: 'NaN',
              altitude: '7450.0',
              geoaltitude: '7450.0',
              last_position: '',
              lastcontact: '',
              hour: '',
              dateMessageGenerated: '2022/07/29',
              timeMessageGenerated: '20:42:30.000',
              dateMessageLogged: '2022/07/29',
              timeMessageLogged: '20:42:30.000',
            },
          ],
          true,
        ),
        'MSG,3,1,1,34648e,1,2022/07/29,20:42:30.000,2022/07/29,20:42:30.000,SWN5614,7450.0,291.0,355.66173320857183,43.84039306640625,1.292171034702035,2752.0,,1,0,0,1,{"altitude":"7450.0","last_position":"","lastcontact":"","hour":""}\n',
      )
    })
  })
})
