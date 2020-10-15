import calcHeadingDepth from '../../src/util/calcHeadingDepth'

describe('calcHeadingDepth', () => {
  test('calc depth heading', () => {
    let markdown = ' text'
    for (let i = 1; i <= 6; i++) {
      markdown = '#' + markdown
      const heading = calcHeadingDepth(markdown)

      if (heading) {
        expect(heading.depth).toEqual(i)
        expect(heading.text).toEqual('text')
      } else {
        expect(heading).toBeTruthy() // always failed
      }
    }
  })

  test('calc depth 7 heading', () => {
    const markdown = '####### h7'
    const heading = calcHeadingDepth(markdown)

    expect(heading).toBeFalsy()
  })

  test('list', () => {
    const markdown = '- list'
    const heading = calcHeadingDepth(markdown)

    expect(heading).toBeFalsy()
  })
})
