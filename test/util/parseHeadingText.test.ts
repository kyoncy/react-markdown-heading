import markdownToAst from '../../src/util/markdownToAst'
import pickHeadingFromAst from '../../src/util/pickHeadingFromAst'
import parseHeadingAST from '../../src/util/parseHeadingAST'
import parseHeadingText from '../../src/util/parseHeadingText'

describe('parseHeadingText', () => {
  function markdownToHeadingList(markdown: string) {
    const headingAst = pickHeadingFromAst(markdownToAst(markdown))
    const headingList = parseHeadingAST(headingAst)
    return parseHeadingText(headingList)
  }

  test('have key headingList text, href, duplicateCount', () => {
    const markdown = '# h1\n## h2\n'
    const headingList = markdownToHeadingList(markdown)

    expect(headingList).toHaveLength(2)
    headingList.forEach((heading) => {
      expect(heading.text).not.toBe(undefined)
      expect(heading.href).not.toBe(undefined)
      expect(heading.duplicateCount).not.toBe(undefined)
    })
  })

  test('case duplicate href', () => {
    const markdown = '## h2\n### h3\n### h3'
    const headingList = markdownToHeadingList(markdown)

    expect(headingList).toHaveLength(3)
    expect(headingList[0].href).toEqual('#h2')
    expect(headingList[0].duplicateCount).toEqual(0)

    expect(headingList[1].href).toEqual('#h3')
    expect(headingList[1].duplicateCount).toEqual(0)

    expect(headingList[2].href).toEqual('#h3-1')
    expect(headingList[2].duplicateCount).toEqual(1)
  })

  test('case duplicate href with blankSpaceReplaceText', () => {
    const markdown = '## h2\n### h3\n### h3'
    const headingAst = pickHeadingFromAst(markdownToAst(markdown))
    const headingList = parseHeadingText(parseHeadingAST(headingAst), '_')

    expect(headingList).toHaveLength(3)
    expect(headingList[0].href).toEqual('#h2')
    expect(headingList[0].duplicateCount).toEqual(0)

    expect(headingList[1].href).toEqual('#h3')
    expect(headingList[1].duplicateCount).toEqual(0)

    expect(headingList[2].href).toEqual('#h3_1')
    expect(headingList[2].duplicateCount).toEqual(1)
  })
})
