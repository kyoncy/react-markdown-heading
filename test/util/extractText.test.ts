import markdownToHeading from '../../src/util/markdownToHeading'
import parseHeadingAST from '../../src/util/parseHeadingAST'
import extractText from '../../src/util/extractText'

describe('extractText', () => {
  function markdownToHeadingList(markdown: string) {
    const headingAst = markdownToHeading(markdown)
    return parseHeadingAST(headingAst)
  }

  test('text equales hyperlink text', () => {
    const markdown = '# h1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item)
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#h1')
  })

  test('text has blank space', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item)
    expect(content.text).toEqual('h 1')
    expect(content.href).toEqual('#h-1')
  })

  test('set blankSpaceReplaceText', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item, '_')
    expect(content.text).toEqual('h 1')
    expect(content.href).toEqual('#h_1')
  })

  test('custom hyperlink', () => {
    const markdown = '# [h1](#foo)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item)
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#foo')
  })

  test('custom hyperlink text is null', () => {
    const markdown = '# [](#foo)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item)
    expect(content.text).toEqual('[](#foo)')
    expect(content.href).toEqual('#[](#foo)')
  })

  test('custom hyperlink href is null', () => {
    const markdown = '# [h1]()'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item)
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('')
  })

  test.skip('custom hyperlink with text part1', () => {
    const markdown = '# [h1](#foo) bar'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item)
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#foo')
  })

  test.skip('custom hyperlink with text part2', () => {
    const markdown = '# bar [h1](#foo)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item)
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#foo')
  })
})