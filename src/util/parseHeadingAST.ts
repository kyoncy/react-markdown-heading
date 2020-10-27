import { Heading } from 'mdast'

export interface HeadingWithId extends Heading {
  id: number
  parentId: number
}

const parseHeadingAST = (headingAST: Heading[]): HeadingWithId[] => {
  const headingList: HeadingWithId[] = []

  let depth: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
  let parentId = 0
  let heading: HeadingWithId

  headingAST.forEach((item, index) => {
    heading = Object.assign(item, { id: index + 1, parentId: 0 })

    const sames = headingList.filter(
      (itemWithId) => itemWithId.depth === item.depth
    )
    heading.parentId =
      item.depth > depth
        ? index
        : sames.length && sames[sames.length - 1].parentId
    parentId =
      item.depth > depth ? parentId + 1 : sames.length && heading.parentId
    depth = item.depth

    headingList.push(heading)
  })

  return headingList
}

export default parseHeadingAST
