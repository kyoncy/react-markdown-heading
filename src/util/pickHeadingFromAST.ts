import { Content, Heading } from 'mdast'

const pickHeadingFromAST = (markdownAst: Content[]): Heading[] => {
  return markdownAst.filter((item) => item.type === 'heading') as Heading[]
}

export default pickHeadingFromAST
