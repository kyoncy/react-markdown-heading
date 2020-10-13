import React from 'react'
import Heading from './Heading'
import markdownToAST from '../util/markdownToAST'
import pickHeadingFromAST from '../util/pickHeadingFromAST'
import parseHeadingAST from '../util/parseHeadingAST'

interface ReactMarkdownHeadingProps {
  markdown: string
  ulClassName?: string
  liClassName?: string
  hyperlink?: boolean
}

const ReactMarkdownHeading: React.FC<ReactMarkdownHeadingProps> = ({
  markdown,
  ulClassName,
  liClassName,
  hyperlink = false,
}) => {
  const ast = markdownToAST(markdown)
  const headingAst = pickHeadingFromAST(ast)
  const headingList = parseHeadingAST(headingAst)

  return (
    <Heading
      headingList={headingList}
      ulClassName={ulClassName}
      liClassName={liClassName}
      hyperlink={hyperlink}
    />
  )
}

export default ReactMarkdownHeading
