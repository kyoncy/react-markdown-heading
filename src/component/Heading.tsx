import React, { FC } from 'react'
import { HeadingWithId } from '../util/parseHeadingAST'

interface HeadingProps {
  headingList: HeadingWithId[]
  rootId?: number
  ulClassName?: string
  liClassName?: string
}

const Heading: FC<HeadingProps> = ({
  headingList,
  rootId,
  ulClassName,
  liClassName,
}) => {
  const filteredList = headingList.filter((item) => item.parentId === rootId)

  if (filteredList.length === 0) return null

  return (
    <ul className={ulClassName}>
      {filteredList.map((item, index) => {
        const text = item.children[0].value as string
        return (
          <li key={index} className={liClassName}>
            <a href={`#${text}`}>{text}</a>
            <Heading
              headingList={headingList}
              rootId={item.id}
              ulClassName={ulClassName}
              liClassName={liClassName}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default Heading
