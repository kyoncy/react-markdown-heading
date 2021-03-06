import markdownToAst from '../../src/util/markdownToAst'
import pickHeadingFromAst from '../../src/util/pickHeadingFromAst'
import parseHeadingAST from '../../src/util/parseHeadingAST'
import extractText from '../../src/util/extractText'

describe('extractText', () => {
  function markdownToHeadingList(markdown: string) {
    const headingAst = pickHeadingFromAst(markdownToAst(markdown))
    return parseHeadingAST(headingAst)
  }

  test('text equales hyperlink text', () => {
    const markdown = '# h1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#h1')
  })

  test('text has blank space', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('h 1')
    expect(content.href).toEqual('#h-1')
  })

  test('set blankSpaceReplaceText', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children, '_')
    expect(content.text).toEqual('h 1')
    expect(content.href).toEqual('#h_1')
  })

  test('custom hyperlink', () => {
    const markdown = '# [h1](example.com)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#h1')
  })

  test('custom hyperlink text is null', () => {
    const markdown = '# [](#foo)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('')
    expect(content.href).toEqual('#')
  })

  test('custom hyperlink href is null', () => {
    const markdown = '# [h1]()'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#h1')
  })

  test('custom hyperlink with text part1', () => {
    const markdown = '# [h1](#foo) bar'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('h1 bar')
    expect(content.href).toEqual('#h1-bar')
  })

  test('custom hyperlink with text part2', () => {
    const markdown = '# bar [h1](#foo)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('bar h1')
    expect(content.href).toEqual('#bar-h1')
  })

  test('inlineCode', () => {
    const markdown = '# `hoge`'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('hoge')
    expect(content.href).toEqual('#hoge')
  })

  test('strong', () => {
    const markdown = '# **strong**'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('strong')
    expect(content.href).toEqual('#strong')
  })

  test('strong not have text', () => {
    const markdown = '# ****'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('****')
    expect(content.href).toEqual('#****')
  })

  test('emphasis', () => {
    const markdown = '# *emphasis*'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('emphasis')
    expect(content.href).toEqual('#emphasis')
  })

  test('strong and emphasis', () => {
    const markdown = '# **strong** *emphasis*'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('strong emphasis')
    expect(content.href).toEqual('#strong-emphasis')
  })

  test('emphasis in link', () => {
    const markdown = '# [*emphasis*](example.com)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('emphasis')
    expect(content.href).toEqual('#emphasis')
  })

  test('strong in link', () => {
    const markdown = '# [**strong**](example.com)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children)
    expect(content.text).toEqual('strong')
    expect(content.href).toEqual('#strong')
  })
})
