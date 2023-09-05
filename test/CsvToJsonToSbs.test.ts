import { describe } from 'mocha'
import assert from 'assert'
import { convertCSVtoJSON } from '../src/CsvToJson'
import { convertJSONtoSBS } from '../src/JsonToSbs'

describe('CsvToJsonToSbs', () => {
  context('Data csv no valid', () => {
    it('return Error when csv content is no valid with timestamp no valid', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        'test,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string = ''
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is no valid with values empty and no icao', async () => {
      const csvContent: string =
        'hour,lastcontact,last_position,geoaltitude,altitude,squawk,spi,alert,onground,callsign,vertical_rate,track,groundspeed,longitude,latitude,icao24,timestamp\n' +
        ',,,,,,,,,,,,,,,,1672575671'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string = ''
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return Error when csv content is no valid with timestamp no valid with extraField', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        'test,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string = ''
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is no valid with values empty and no icao with extraField', async () => {
      const csvContent: string =
        'hour,lastcontact,last_position,geoaltitude,altitude,squawk,spi,alert,onground,callsign,vertical_rate,track,groundspeed,longitude,latitude,icao24,timestamp\n' +
        ',,,,,,,,,,,,,,,,1672575671'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string = ''
      assert.deepStrictEqual(sbsContent, expectedResult)
    })
  })

  context('Data csv valid', () => {
    it('return sbs content when csv content is valid', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with track field and options alert, onground and spi to false', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,0,0,0,0\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with squawk empty', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with squawk', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,7015,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,1,0,1,1\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with 2 lines (same plane)', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n' +
        '1672575672,39c902,43.28981043928761,5.402265276227679,4.395411462756131,290.5560452195834,5.52704,SAMU13,True,True,True,NaN,-38.1,129.54,1672575671.346,1672575671.892,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n' +
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,129.54,4.395411462756131,290.5560452195834,43.28981043928761,5.402265276227679,5.52704,,1,0,1,1\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with last line empty', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n' +
        '1672575672,39c902,43.28981043928761,5.402265276227679,4.395411462756131,290.5560452195834,5.52704,SAMU13,True,True,True,NaN,-38.1,129.54,1672575671.346,1672575671.892,1672574400\n' +
        ''
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n' +
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,129.54,4.395411462756131,290.5560452195834,43.28981043928761,5.402265276227679,5.52704,,1,0,1,1\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with other order of fields', async () => {
      const csvContent: string =
        'hour,lastcontact,last_position,geoaltitude,altitude,squawk,spi,alert,onground,callsign,vertical_rate,track,groundspeed,longitude,latitude,icao24,timestamp\n' +
        '1672574400,1672575670.797,1672575670.76,121.92,-45.72,NaN,True,True,True,SAMU13,5.85216,296.565051177078,3.450995263850706,5.40233523346657,43.289794921875,39c902,1672575671'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with extraField', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"altitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with track field and options alert, onground and spi to false with extraField', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,False,False,False,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,0,0,0,0,{"altitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with squawk empty with extraField', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"altitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with squawk with extraField', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,7015,-45.72,121.92,1672575670.76,1672575670.797,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,7015,1,0,1,1,{"altitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with 2 lines (same plane) with extraField', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n' +
        '1672575672,39c902,43.28981043928761,5.402265276227679,4.395411462756131,290.5560452195834,5.52704,SAMU13,True,True,True,NaN,-38.1,129.54,1672575671.346,1672575671.892,1672574400'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"altitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}\n' +
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,129.54,4.395411462756131,290.5560452195834,43.28981043928761,5.402265276227679,5.52704,,1,0,1,1,{"altitude":"-38.1","last_position":"1672575671.346","lastcontact":"1672575671.892","hour":"1672574400"}\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with last line empty with extraField', async () => {
      const csvContent: string =
        'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude,last_position,lastcontact,hour\n' +
        '1672575671,39c902,43.289794921875,5.40233523346657,3.450995263850706,296.565051177078,5.85216,SAMU13,True,True,True,NaN,-45.72,121.92,1672575670.76,1672575670.797,1672574400\n' +
        '1672575672,39c902,43.28981043928761,5.402265276227679,4.395411462756131,290.5560452195834,5.52704,SAMU13,True,True,True,NaN,-38.1,129.54,1672575671.346,1672575671.892,1672574400\n' +
        ''
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"altitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}\n' +
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,129.54,4.395411462756131,290.5560452195834,43.28981043928761,5.402265276227679,5.52704,,1,0,1,1,{"altitude":"-38.1","last_position":"1672575671.346","lastcontact":"1672575671.892","hour":"1672574400"}\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })

    it('return sbs content when csv content is valid with other order of fields with extraField', async () => {
      const csvContent: string =
        'hour,lastcontact,last_position,geoaltitude,altitude,squawk,spi,alert,onground,callsign,vertical_rate,track,groundspeed,longitude,latitude,icao24,timestamp\n' +
        '1672574400,1672575670.797,1672575670.76,121.92,-45.72,NaN,True,True,True,SAMU13,5.85216,296.565051177078,3.450995263850706,5.40233523346657,43.289794921875,39c902,1672575671'
      const jsonContent: string = convertCSVtoJSON(csvContent)
      const sbsContent: string = convertJSONtoSBS(jsonContent, true)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"altitude":"-45.72","last_position":"1672575670.76","lastcontact":"1672575670.797","hour":"1672574400"}\n'
      assert.deepStrictEqual(sbsContent, expectedResult)
    })
  })
})
