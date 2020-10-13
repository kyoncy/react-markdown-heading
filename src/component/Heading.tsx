import React, { FC } from 'react'
import { HeadingWithId } from '../util/parseHeadingAST'

interface HeadingProps {
  headingList: HeadingWithId[]
  rootId?: number
  ulClassName?: string
  liClassName?: string
  hyperlink?: boolean
}

const Heading: FC<HeadingProps> = ({
  headingList,
  rootId = 0,
  ulClassName,
  liClassName,
  hyperlink = false,
}) => {
  const filteredList = headingList.filter((item) => item.parentId === rootId)

  if (filteredList.length === 0) return null

  return (
    <ul className={ulClassName}>
      {filteredList.map((item, index) => {
        const text = item.children[0].value as string
        return (
          <li key={index} className={liClassName}>
            {hyperlink ? <a href={`#${text}`}>{text}</a> : text}
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
