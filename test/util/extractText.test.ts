import markdownToAST from '../../src/util/markdownToAST'
import pickHeadingFromAST from '../../src/util/pickHeadingFromAST'
import parseHeadingAST from '../../src/util/parseHeadingAST'
import extractText from '../../src/util/extractText'

describe('extractText', () => {
  function markdownToHeadingList(markdown: string) {
    const ast = markdownToAST(markdown)
    const headingAst = pickHeadingFromAST(ast)
    return parseHeadingAST(headingAst)
  }

  test('text equales hyperlink text', () => {
    const markdown = '# h1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children[0])
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#h1')
  })

  test('text has blank space', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children[0])
    expect(content.text).toEqual('h 1')
    expect(content.href).toEqual('#h-1')
  })

  test('set blankSpaceReplaceText', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children[0], '_')
    expect(content.text).toEqual('h 1')
    expect(content.href).toEqual('#h_1')
  })

  test('custom hyperlink text', () => {
    const markdown = '# [h1](#foo)'
    const headingList = markdownToHeadingList(markdown)

    const item = headingList[0]
    const content = extractText(item.children[0])
    expect(content.text).toEqual('h1')
    expect(content.href).toEqual('#foo')
  })
})
