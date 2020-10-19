import markdownToHeading from '../../src/util/markdownToHeading'

describe('markdownToHeading', () => {
  test('markdown to ast', () => {
    const markdown = '# h1\n- foo\n- bar'
    const depthes = [1]

    const headings = markdownToHeading(markdown)

    expect(headings).toHaveLength(1)
    headings.forEach((item, index) => {
      expect(item.depth).toEqual(depthes[index])
    })
  })

  test('markdown to headings only heading', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const depthes = [2, 3, 4, 3, 1, 3]

    const headings = markdownToHeading(markdown)

    expect(headings).toHaveLength(6)
    headings.forEach((item, index) => {
      expect(item.depth).toEqual(depthes[index])
    })
  })

  test('code block', () => {
    const markdown = '```markdown\n# h1\n## h2\n```'
    const headings = markdownToHeading(markdown)

    expect(headings).toHaveLength(0)
  })
})
