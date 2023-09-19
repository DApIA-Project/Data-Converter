import { toSbsBoolean, toSbsDate, toSbsTime } from '../../src/utils/utils'
import assert from 'assert'

describe('utils', () => {
  context('toSbsBoolean', () => {
    it('returns empty string if the value is undefined', () => {
      assert.strictEqual(toSbsBoolean(undefined), '')
    })

    context('when value is a string', () => {
      it('returns `1` if the value is truthy', () => {
        assert.strictEqual(toSbsBoolean('1'), '1')
        assert.strictEqual(toSbsBoolean('true'), '1')
        assert.strictEqual(toSbsBoolean('TRUE'), '1')
      })

      it('returns `0` if the value is falsy', () => {
        assert.strictEqual(toSbsBoolean('0'), '0')
        assert.strictEqual(toSbsBoolean('false'), '0')
        assert.strictEqual(toSbsBoolean('FALSE'), '0')
      })

      it('returns `0` if the value is not a boolean', () => {
        assert.strictEqual(toSbsBoolean('20'), '0')
        assert.strictEqual(toSbsBoolean('not_a_bool'), '0')
      })

      it('returns empty string if the value is empty', () => {
        assert.strictEqual(toSbsBoolean(''), '')
      })
    })

    context('when value is a boolean', () => {
      it('returns `1` if the value is truthy', () => {
        assert.strictEqual(toSbsBoolean(true), '1')
      })

      it('returns `0` if the value is falsy', () => {
        assert.strictEqual(toSbsBoolean(false), '0')
      })
    })

    context('when value is a number', () => {
      it('returns `1` if the value is positive', () => {
        assert.strictEqual(toSbsBoolean(1), '1')
        assert.strictEqual(toSbsBoolean(10), '1')
        assert.strictEqual(toSbsBoolean(10000), '1')
      })

      it('returns `0` if the value is negative or null', () => {
        assert.strictEqual(toSbsBoolean(0), '0')
        assert.strictEqual(toSbsBoolean(-1), '0')
        assert.strictEqual(toSbsBoolean(-10), '0')
        assert.strictEqual(toSbsBoolean(-1000), '0')
      })
    })
  })

  context('toSbsDate', () => {
    it('throws an error if date is not valid', () => {
      assert.throws(() => toSbsDate(''), Error, 'Invalid date')
      assert.throws(() => toSbsDate('not_a_date'), Error, 'Invalid date')
      assert.throws(() => toSbsDate(undefined), Error, 'Invalid date')
    })

    it('returns a formatted date', () => {
      assert.strictEqual(toSbsDate('1693899121'), '2023/09/05')
      assert.strictEqual(toSbsDate('-1'), '1969/12/31')
    })
  })

  context('toSbsTime', () => {
    it('throws an error if date is not valid', () => {
      assert.throws(() => toSbsTime(''), Error, 'Invalid date')
      assert.throws(() => toSbsTime('not_a_date'), Error, 'Invalid date')
      assert.throws(() => toSbsTime(undefined), Error, 'Invalid date')
    })

    it('returns a formatted time', () => {
      assert.strictEqual(toSbsTime('1693899121'), '07:32:01.000')
      assert.strictEqual(toSbsTime('-1'), '23:59:59.000')
    })
  })
})
