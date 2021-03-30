/* eslint-disable react/display-name */
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

const Heading: FC<HeadingProps> = React.memo(
  ({
    headingList,
    rootId = 0,
    ulClassName,
    liClassName,
    anchorClassName,
    hyperlink = false,
  }) => {
    const filteredList = headingList.filter((item) => item.parentId === rootId)

    return filteredList.length ? (
      <ul className={ulClassName}>
        {filteredList.map((item, index) => {
          const { text, href } = item
          const element = hyperlink ? (
            <a href={href} className={anchorClassName}>
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
    ) : null
  }
)

export default Heading
