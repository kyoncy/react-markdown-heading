import markdownToAST from '../../src/util/markdownToAST'

describe('markdownToAST', () => {
  test('markdown to ast', () => {
    const markdown = '# h1\n- foo\n- bar'
    const types = ['heading', 'list']

    const ast = markdownToAST(markdown)

    expect(ast).toHaveLength(2)
    ast.forEach((item, index) => {
      expect(item.type).toEqual(types[index])
    })
  })

  test('markdown to ast only heading', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'

    const ast = markdownToAST(markdown)

    expect(ast).toHaveLength(6)
    ast.forEach((item) => {
      expect(item.type).toEqual('heading')
    })
  })
})
