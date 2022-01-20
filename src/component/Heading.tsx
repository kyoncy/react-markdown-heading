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
    if (filteredList.length === 0) return null

    return (
      <ul className={ulClassName}>
        {filteredList.map((item, index) => {
          const { text, href } = item

          return (
            <li key={index} className={liClassName}>
              {hyperlink ? (
                <a href={href} className={anchorClassName}>
                  {text}
                </a>
              ) : (
                text
              )}
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
)

export default Heading
