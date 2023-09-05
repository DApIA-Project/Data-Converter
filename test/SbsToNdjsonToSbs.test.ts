import { describe } from 'mocha'
import assert from 'assert'
import { convertSBStoNDJSON } from '../src/SbsToNdjson'
import { convertNDJSONtoSBS } from '../src/NdjsonToSbs'

describe('SbsToNdjsonToSbs', () => {
  context('Data sbs valid', () => {
    it('return sbs content when sbs content is valid and sbs to ndjson to sbs', async () => {
      const sbsContent: string =
        'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1'
      const ndjsonContent: string = convertSBStoNDJSON(sbsContent)
      const sbsContent2: string = convertNDJSONtoSBS(ndjsonContent)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1\n'
      assert.deepStrictEqual(sbsContent2, expectedResult)
    })

    it('return sbs content when sbs content is valid with extraField', async () => {
      const sbsContent: string =
        'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"altitude":"1211.92","last_position":"111.99","lastcontact":"123.45","hour":"123456"}\n'
      const ndjsonContent: string = convertSBStoNDJSON(sbsContent, true)
      const sbsContent2: string = convertNDJSONtoSBS(ndjsonContent, true)

      const expectedResult: string =
        'MSG,3,1,1,39c902,1,2023/01/01,13:21:11.000,2023/01/01,13:21:11.000,SAMU13,121.92,3.450995263850706,296.565051177078,43.289794921875,5.40233523346657,5.85216,,1,0,1,1,{"altitude":"1211.92","last_position":"111.99","lastcontact":"123.45","hour":"123456"}\n'
      assert.deepStrictEqual(sbsContent2, expectedResult)
    })
  })
})
