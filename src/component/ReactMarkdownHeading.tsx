import { useEffect, useMemo } from 'react'
import Heading from './Heading'
import markdownToAST from '../util/markdownToAst'
import pickHeadingFromAST from '../util/pickHeadingFromAst'
import parseHeadingAST from '../util/parseHeadingAST'
import parseHeadingText, {
  Heading as HeadingType,
} from '../util/parseHeadingText'

interface ReactMarkdownHeadingProps {
  markdown: string
  ulClassName?: string
  liClassName?: string
  anchorClassName?: string
  hyperlink?: boolean
  blankSpaceReplaceText?: string
  headingDepth?: 1 | 2 | 3 | 4 | 5 | 6
  hyperLinkPrefix?: string
  onChangeHeading?: (headingList: HeadingType[]) => void
  activeLiClassName?: string
  activeAnchorClassName?: string
  activeHeading?: HeadingType[]
}

const ReactMarkdownHeading: React.FC<ReactMarkdownHeadingProps> = ({
  markdown,
  ulClassName,
  liClassName,
  anchorClassName,
  hyperlink,
  blankSpaceReplaceText,
  headingDepth,
  hyperLinkPrefix,
  onChangeHeading,
  activeLiClassName,
  activeAnchorClassName,
  activeHeading,
}) => {
  const headingAst = pickHeadingFromAST(markdownToAST(markdown), headingDepth)
  const headingList = useMemo(() => parseHeadingAST(headingAst), [headingAst])
  const parsedHeadingList = useMemo(
    () => parseHeadingText(headingList, blankSpaceReplaceText, hyperLinkPrefix),
    [headingList]
  )

  useEffect(() => {
    if (onChangeHeading) {
      onChangeHeading(parsedHeadingList)
    }
  }, [parsedHeadingList])

  return (
    <Heading
      headingList={parsedHeadingList}
      ulClassName={ulClassName}
      liClassName={liClassName}
      anchorClassName={anchorClassName}
      hyperlink={hyperlink}
      activeLiClassName={activeLiClassName}
      activeAnchorClassName={activeAnchorClassName}
      activeHeading={activeHeading}
    />
  )
}

export default ReactMarkdownHeading
