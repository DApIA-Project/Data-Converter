import { toSbsBoolean, toSbsDate, toSbsTime } from '../../src/utils/utils'
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

  context('toSbsDate', () => {
    it('throws an error if date is not valid', () => {
      assert.throws(() => toSbsDate(''), Error, 'Invalid date')
      assert.throws(() => toSbsDate('not_a_date'), Error, 'Invalid date')
      assert.throws(() => toSbsDate('not_a_date'), Error, 'Invalid date')
    })

    it('returns a formatted date', () => {
      assert.equal(toSbsDate('1693899121'), '2023/09/05')
      assert.equal(toSbsDate('-1'), '1969/12/31')
    })
  })

  context('toSbsTime', () => {
    it('throws an error if date is not valid', () => {
      assert.throws(() => toSbsTime(''), Error, 'Invalid date')
      assert.throws(() => toSbsTime('not_a_date'), Error, 'Invalid date')
      assert.throws(() => toSbsTime('not_a_date'), Error, 'Invalid date')
    })

    it('returns a formatted time', () => {
      assert.equal(toSbsTime('1693899121'), '07:32:01.000')
      assert.equal(toSbsTime('-1'), '23:59:59.000')
    })
  })
})
