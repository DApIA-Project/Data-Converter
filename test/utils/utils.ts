import { parseSbsBoolean } from '../../src/utils/utils'
import assert from 'assert'

describe('utils', () => {
  context('parseSbsBoolean', () => {
    it('returns `1` if the value is truthy', () => {
      assert.equal(parseSbsBoolean('1'), 1)
      assert.equal(parseSbsBoolean('true'), 1)
      assert.equal(parseSbsBoolean('TRUE'), 1)
    })

    it('returns `0` if the value is falsy', () => {
      assert.equal(parseSbsBoolean('0'), 0)
      assert.equal(parseSbsBoolean('false'), 0)
      assert.equal(parseSbsBoolean('FALSE'), 0)
    })

    it('returns `0` if the value is not a boolean', () => {
      assert.equal(parseSbsBoolean('20'), 0)
      assert.equal(parseSbsBoolean('not_a_bool'), 0)
      assert.equal(parseSbsBoolean(''), 0)
      assert.equal(parseSbsBoolean(undefined), 0)
    })
  })
})
