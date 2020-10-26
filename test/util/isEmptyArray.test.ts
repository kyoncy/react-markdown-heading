import isEmptyArray from '../../src/util/isEmptyArray'

describe('isEmptyArray', () => {
  test('empty array', () => {
    expect(isEmptyArray([])).toEqual(true)
  })

  test('not empty array', () => {
    expect(isEmptyArray([1, 2, 3])).toEqual(false)
    expect(isEmptyArray(['1', '2', '3'])).toEqual(false)
    expect(isEmptyArray([{ foo: 1 }, { foo: 2 }, { foo: 3 }])).toEqual(false)
  })
})
