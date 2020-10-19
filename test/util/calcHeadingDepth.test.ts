import calcHeadingDepth from '../../src/util/calcHeadingDepth'
import { Heading } from '../../src/types/Heading'

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

describe('calcHeadingDepth edge case', () => {
  function testHeading(heading: Heading | null, depth: number, text: string) {
    if (heading) {
      expect(heading.depth).toEqual(depth)
      expect(heading.text).toEqual(text)
    } else {
      expect(heading).toBeTruthy() // always failed
    }
  }

  test('"#h1" is null', () => {
    const markdown = '#h1'
    const heading = calcHeadingDepth(markdown)

    expect(heading).toBeFalsy()
  })

  test('"#" is null', () => {
    const markdown = '#'
    const heading = calcHeadingDepth(markdown)

    expect(heading).toBeFalsy()
  })

  test('"# " is null', () => {
    const markdown = '# '
    const heading = calcHeadingDepth(markdown)

    expect(heading).toBeFalsy()
  })

  test('"#  h1"\'s text is "h1"', () => {
    const markdown = '#  h1'
    const heading = calcHeadingDepth(markdown)

    testHeading(heading, 1, 'h1')
  })

  test('"# h1 "\'s text is "h1"', () => {
    const markdown = '# h1 '
    const heading = calcHeadingDepth(markdown)

    testHeading(heading, 1, 'h1')
  })

  test('"# this is h1"\'s text is "this is h1"', () => {
    const markdown = '# this is h1'
    const heading = calcHeadingDepth(markdown)

    testHeading(heading, 1, 'this is h1')
  })

  test('"# h1  #"\'s text is "h1"', () => {
    const markdown = '# h1  #'
    const heading = calcHeadingDepth(markdown)

    testHeading(heading, 1, 'h1')
  })

  test('"# h1 # "\'s text is "h1"', () => {
    const markdown = '# h1 # '
    const heading = calcHeadingDepth(markdown)

    testHeading(heading, 1, 'h1')
  })

  test('"# h1 foo#"\'s text is "h1 foo#"', () => {
    const markdown = '# h1 foo#'
    const heading = calcHeadingDepth(markdown)

    testHeading(heading, 1, 'h1 foo#')
  })
})
