import React from 'react'
import Heading from './Heading'
import markdownToAST from '../util/markdownToAST'
import pickHeadingFromAST from '../util/pickHeadingFromAST'
import parseHeadingAST from '../util/parseHeadingAST'

interface ReactMarkdownHeadingProps {
  markdown: string
  ulClassName?: string
  liClassName?: string
}

const ReactMarkdownHeading: React.FC<ReactMarkdownHeadingProps> = ({
  markdown,
  ulClassName,
  liClassName,
}) => {
  const ast = markdownToAST(markdown)
  const headingAst = pickHeadingFromAST(ast)
  const headingList = parseHeadingAST(headingAst)

  return (
    <Heading
      headingList={headingList}
      rootId={0}
      ulClassName={ulClassName}
      liClassName={liClassName}
    />
  )
}

export default ReactMarkdownHeading
