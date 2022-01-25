import classnames from 'classnames'
import { FC, memo } from 'react'
import { Heading } from '../util/parseHeadingText'

interface HeadingProps {
  headingList: Heading[]
  rootId?: number
  ulClassName?: string
  liClassName?: string
  anchorClassName?: string
  hyperlink?: boolean
  activeLiClassName?: string
  activeAnchorClassName?: string
  activeHeading?: Heading[]
}

const Heading: FC<HeadingProps> = memo(
  ({
    headingList,
    rootId = 0,
    ulClassName,
    liClassName,
    anchorClassName,
    hyperlink = false,
    activeLiClassName,
    activeAnchorClassName,
    activeHeading,
  }) => {
    const filteredList = headingList.filter((item) => item.parentId === rootId)
    if (filteredList.length === 0) return null

    return (
      <ul className={classnames(ulClassName)}>
        {filteredList.map((item, index) => {
          const { text, href } = item
          const isActive = activeHeading?.map((x) => x.href)?.includes(href)

          return (
            <li
              key={index}
              className={classnames(liClassName, isActive && activeLiClassName)}
            >
              {hyperlink ? (
                <a
                  href={href}
                  className={classnames(
                    anchorClassName,
                    isActive && activeAnchorClassName
                  )}
                >
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
                activeHeading={activeHeading}
              />
            </li>
          )
        })}
      </ul>
    )
  }
)

export default Heading
