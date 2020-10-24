import React, { FC } from 'react'
import { Heading } from '../util/parseHeadingText'

interface HeadingProps {
  headingList: Heading[]
  rootId?: number
  ulClassName?: string
  liClassName?: string
  anchorClassName?: string
  hyperlink?: boolean
}

const Heading: FC<HeadingProps> = ({
  headingList,
  rootId = 0,
  ulClassName,
  liClassName,
  anchorClassName,
  hyperlink = false,
}) => {
  const filteredList = headingList.filter((item) => item.parentId === rootId)

  if (filteredList.length === 0) return null

  return (
    <ul className={ulClassName}>
      {filteredList.map((item, index) => {
        const { text, href, duplicateCount } = item

        const duplicate = duplicateCount !== 0 ? `-${duplicateCount}` : ''
        const element = hyperlink ? (
          <a href={href + duplicate} className={anchorClassName}>
            {text}
          </a>
        ) : (
          text
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
            />
          </li>
        )
      })}
    </ul>
  )
}

export default Heading
