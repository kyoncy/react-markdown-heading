import React, { FC } from 'react'
import { HeadingWithId } from '../util/parseHeadingAST'
import extractText from '../util/extractText'

interface HeadingProps {
  headingList: HeadingWithId[]
  rootId?: number
  ulClassName?: string
  liClassName?: string
  anchorClassName?: string
  hyperlink?: boolean
  blankSpaceReplaceText?: string
}

const Heading: FC<HeadingProps> = ({
  headingList,
  rootId = 0,
  ulClassName,
  liClassName,
  anchorClassName,
  hyperlink = false,
  blankSpaceReplaceText = '-',
}) => {
  const filteredList = headingList.filter((item) => item.parentId === rootId)

  if (filteredList.length === 0) return null

  return (
    <ul className={ulClassName}>
      {filteredList.map((item, index) => {
        const content = extractText(item, blankSpaceReplaceText)

        const element = hyperlink ? (
          <a href={content.href} className={anchorClassName}>
            {content.text}
          </a>
        ) : (
          content.text
        )

        return (
          <li key={index} className={liClassName}>
            {element}
            <Heading
              headingList={headingList}
              rootId={item.id}
              ulClassName={ulClassName}
              liClassName={liClassName}
              hyperlink={hyperlink}
              blankSpaceReplaceText={blankSpaceReplaceText}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default Heading
