import markdownToAST from '../../src/util/markdownToAST'
import pickHeadingFromAST from '../../src/util/pickHeadingFromAST'
import parseHeadingAST from '../../src/util/parseHeadingAST'

describe('pickHeadingFromAST', () => {
  test('markdown to ast', () => {
    const markdown = '# h1\n- foo\n- bar'

    const ast = markdownToAST(markdown)
    const headingAst = pickHeadingFromAST(ast)
    const headingList = parseHeadingAST(headingAst)

    expect(headingList).toHaveLength(1)
    expect(headingList[0].type).toEqual('heading')
    expect(headingList[0].parentId).toEqual(0)
  })

  test('markdown to ast only heading', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const parentIdList = [0, 1, 2, 1, 0, 5]

    const ast = markdownToAST(markdown)
    const headingAst = pickHeadingFromAST(ast)
    const headingList = parseHeadingAST(headingAst)

    expect(headingList).toHaveLength(6)
    headingList.forEach((item, index) => {
      expect(item.type).toEqual('heading')
      expect(item.parentId).toEqual(parentIdList[index])
    })
  })
})
