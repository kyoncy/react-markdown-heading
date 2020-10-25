import markdownToAst from '../../src/util/markdownToAst'
import pickHeadingFromAst from '../../src/util/pickHeadingFromAst'
import parseHeadingAST from '../../src/util/parseHeadingAST'

describe('parseHeadingAST', () => {
  function markdownToHeadingList(markdown: string) {
    const headingAst = pickHeadingFromAst(markdownToAst(markdown))
    return parseHeadingAST(headingAst)
  }

  test('markdown to ast', () => {
    const markdown = '# h1\n- foo\n- bar'
    const headingList = markdownToHeadingList(markdown)

    expect(headingList).toHaveLength(1)
    expect(headingList[0].parentId).toEqual(0)
  })

  test('markdown to ast only heading', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const parentIdList = [0, 1, 2, 1, 0, 5]
    const headingList = markdownToHeadingList(markdown)

    expect(headingList).toHaveLength(6)
    headingList.forEach((item, index) => {
      expect(item.parentId).toEqual(parentIdList[index])
    })
  })

  test('markdown same depth', () => {
    const markdown = '## h2\n### h3\n### h3\n# h1\n### h3'
    const parentIdList = [0, 1, 1, 0, 4]
    const headingList = markdownToHeadingList(markdown)

    expect(headingList).toHaveLength(5)
    headingList.forEach((item, index) => {
      expect(item.parentId).toEqual(parentIdList[index])
    })
  })
})
