import { Content, Heading } from 'mdast'

const pickHeadingFromAST = (
  markdownAst: Content[],
  headingDepth: 1 | 2 | 3 | 4 | 5 | 6 = 6
): Heading[] => {
  return markdownAst.filter(
    (item): item is Heading =>
      item.type === 'heading' && item.depth <= headingDepth
  )
}

export default pickHeadingFromAST
