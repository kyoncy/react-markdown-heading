import markdownToAst from '../../src/util/markdownToAst'
import pickHeadingFromAst from '../../src/util/pickHeadingFromAst'

describe('pickHeadingFromAst', () => {
  function markdownToHeadingAst(markdown: string) {
    const markdownAst = markdownToAst(markdown)
    return pickHeadingFromAst(markdownAst)
  }

  test('only h1', () => {
    const markdown = '# h1'
    const headingAst = markdownToHeadingAst(markdown)

    expect(headingAst).toHaveLength(1)
    expect(headingAst[0].depth).toEqual(1)
  })

  test('include many headings', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const depthList = [2, 3, 4, 3, 1, 3]
    const headingAst = markdownToHeadingAst(markdown)

    expect(headingAst).toHaveLength(6)
    headingAst.forEach((item, index) => {
      expect(item.depth).toEqual(depthList[index])
    })
  })

  test('include many headings', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const markdownAst = markdownToAst(markdown)
    const headingAst = pickHeadingFromAst(markdownAst, 2)

    expect(headingAst).toHaveLength(2)
    expect(headingAst[0].depth).toEqual(2)
    expect(headingAst[1].depth).toEqual(1)
  })

  test('depth 7 is not heading', () => {
    const markdown = '####### h7'
    const headingAst = markdownToHeadingAst(markdown)

    expect(headingAst).toHaveLength(0)
  })

  test('not heading', () => {
    const markdown = '- foo\n- bar\n```\n# h1\n```'
    const markdownAst = markdownToAst(markdown)
    const headingAst = pickHeadingFromAst(markdownAst, 2)

    expect(headingAst).toHaveLength(0)
  })
})
