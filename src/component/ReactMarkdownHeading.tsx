import React from 'react'
import Heading from './Heading'
import parseHeadingAST from '../util/parseHeadingAST'
import markdownToHeading from '../util/markdownToHeading'

interface ReactMarkdownHeadingProps {
  markdown: string
  ulClassName?: string
  liClassName?: string
  anchorClassName?: string
  hyperlink?: boolean
  blankSpaceReplaceText?: string
}

const ReactMarkdownHeading: React.FC<ReactMarkdownHeadingProps> = ({
  markdown,
  ulClassName,
  liClassName,
  anchorClassName,
  hyperlink,
  blankSpaceReplaceText,
}) => {
  const headingAst = markdownToHeading(markdown)
  const headingList = parseHeadingAST(headingAst)

  return (
    <Heading
      headingList={headingList}
      ulClassName={ulClassName}
      liClassName={liClassName}
      anchorClassName={anchorClassName}
      hyperlink={hyperlink}
      blankSpaceReplaceText={blankSpaceReplaceText}
    />
  )
}

export default ReactMarkdownHeading
