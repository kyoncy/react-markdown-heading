import markdownToAST from '../../src/util/markdownToAST'
import pickHeadingFromAST from '../../src/util/pickHeadingFromAST'

describe('pickHeadingFromAST', () => {
  test('markdown to ast', () => {
    const markdown = '# h1\n- foo\n- bar'

    const ast = markdownToAST(markdown)
    const headingAst = pickHeadingFromAST(ast)

    expect(headingAst).toHaveLength(1)
    expect(headingAst[0].type).toEqual('heading')
    expect(headingAst[0].depth).toEqual(1)
  })

  test('markdown to ast only heading', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const depthList = [2, 3, 4, 3, 1, 3]

    const ast = markdownToAST(markdown)
    const headingAst = pickHeadingFromAST(ast)

    expect(headingAst).toHaveLength(6)
    headingAst.forEach((item, index) => {
      expect(item.type).toEqual('heading')
      expect(item.depth).toEqual(depthList[index])
    })
  })
})
