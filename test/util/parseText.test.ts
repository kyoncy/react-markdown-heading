import markdownToAst from '../../src/util/markdownToAst'
import pickHeadingFromAst from '../../src/util/pickHeadingFromAst'
import parseHeadingAST from '../../src/util/parseHeadingAST'
import parseText from '../../src/util/parseText'

let link = {
  text: '',
  href: '#',
}

describe('extractText', () => {
  function markdownToHeadingList(markdown: string) {
    const headingAst = pickHeadingFromAst(markdownToAst(markdown))
    return parseHeadingAST(headingAst)
  }

  function initLink() {
    link = {
      text: '',
      href: '#',
    }
  }

  beforeEach(() => initLink())

  test('text equales hyperlink text', () => {
    const markdown = '# h1'
    const headingList = markdownToHeadingList(markdown)

    const phrasingContents = headingList[0].children
    phrasingContents.forEach((content) => {
      link = parseText(content, link)
    })

    expect(link.text).toEqual('h1')
    expect(link.href).toEqual('#h1')
  })

  test('set blankSpaceReplaceText', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const phrasingContents = headingList[0].children
    phrasingContents.forEach((content) => {
      link = parseText(content, link, '_')
    })
    expect(link.text).toEqual('h 1')
    expect(link.href).toEqual('#h_1')
  })
  test('emphasis', () => {
    const markdown = '# *emphasis*'
    const headingList = markdownToHeadingList(markdown)

    const phrasingContents = headingList[0].children
    phrasingContents.forEach((content) => {
      link = parseText(content, link)
    })
    expect(link.text).toEqual('emphasis')
    expect(link.href).toEqual('#emphasis')
  })

  test('strong and emphasis', () => {
    const markdown = '# **strong** *emphasis*'
    const headingList = markdownToHeadingList(markdown)

    const phrasingContents = headingList[0].children
    phrasingContents.forEach((content) => {
      link = parseText(content, link)
    })
    expect(link.text).toEqual('strong emphasis')
    expect(link.href).toEqual('#strong-emphasis')
  })

  test('emphasis in link', () => {
    const markdown = '# [*emphasis*](example.com)'
    const headingList = markdownToHeadingList(markdown)

    const phrasingContents = headingList[0].children
    phrasingContents.forEach((content) => {
      link = parseText(content, link)
    })
    expect(link.text).toEqual('emphasis')
    expect(link.href).toEqual('#emphasis')
  })
})
