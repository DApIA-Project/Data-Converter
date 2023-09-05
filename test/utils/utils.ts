import { toSbsBoolean } from '../../src/utils/utils'
import assert from 'assert'

describe('utils', () => {
  context('toSbsBoolean', () => {
    it('returns `1` if the value is truthy', () => {
      assert.equal(toSbsBoolean('1'), 1)
      assert.equal(toSbsBoolean('true'), 1)
      assert.equal(toSbsBoolean('TRUE'), 1)
    })

    it('returns `0` if the value is falsy', () => {
      assert.equal(toSbsBoolean('0'), 0)
      assert.equal(toSbsBoolean('false'), 0)
      assert.equal(toSbsBoolean('FALSE'), 0)
    })

    it('returns `0` if the value is not a boolean', () => {
      assert.equal(toSbsBoolean('20'), 0)
      assert.equal(toSbsBoolean('not_a_bool'), 0)
      assert.equal(toSbsBoolean(''), 0)
      assert.equal(toSbsBoolean(undefined), 0)
    })
  })
})
