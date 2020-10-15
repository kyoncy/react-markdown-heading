import calcHeadingDepth from '../../src/util/calcHeadingDepth'

describe('calcHeadingDepth', () => {
  test('calc depth 2 heading', () => {
    const markdown = '## h2'
    const heading = calcHeadingDepth(markdown)

    if (heading) {
      expect(heading.depth).toEqual(2)
      expect(heading.text).toEqual('h2')
    } else {
      expect(heading).toBeTruthy() // always failed
    }
  })

  test('list', () => {
    const markdown = '- list'
    const heading = calcHeadingDepth(markdown)

    expect(heading).toBeFalsy()
  })
})
