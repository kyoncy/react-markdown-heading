import { fromMarkdown } from 'mdast-util-from-markdown'
import { Content } from 'mdast'

const markdownToAST = (markdown: string): Content[] => {
  return fromMarkdown(markdown).children
}

export default markdownToAST
