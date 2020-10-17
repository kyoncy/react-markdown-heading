import React from 'react'

interface ReactMarkdownHeadingProps {
  markdown: string
  ulClassName?: string
  liClassName?: string
  anchorClassName?: string
  hyperlink?: boolean
  blankSpaceReplaceText?: string
}

declare const ReactMarkdownHeading: React.FC<ReactMarkdownHeadingProps>

export default ReactMarkdownHeading
