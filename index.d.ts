import { FC } from 'react'

interface ReactMarkdownHeadingProps {
  markdown: string
  ulClassName?: string
  liClassName?: string
  anchorClassName?: string
  hyperlink?: boolean
  blankSpaceReplaceText?: string
  headingDepth?: 1 | 2 | 3 | 4 | 5 | 6
  hyperLinkPrefix?: string
}

declare const ReactMarkdownHeading: FC<ReactMarkdownHeadingProps>

export default ReactMarkdownHeading
