import { Heading } from 'mdast'

export interface HeadingWithId extends Heading {
  id: number
  parentId: number
}

const parseHeadingAST = (headingAST: Heading[]): HeadingWithId[] => {
  const headingList: HeadingWithId[] = []

  let currentDepth = 0
  let currentParent = 0
  let currentHeading: HeadingWithId

  headingAST.forEach((item, index) => {
    currentHeading = Object.assign(item, { id: index + 1, parentId: 0 })
    if (item.depth > currentDepth) {
      currentDepth++
      currentHeading.parentId = index
      currentParent++
    } else {
      currentDepth = item.depth
      const sameDepthList = headingList.filter(
        (item) => item.depth === currentDepth
      )
      if (sameDepthList.length > 0) {
        currentHeading.parentId =
          sameDepthList[sameDepthList.length - 1].parentId
        currentParent = currentHeading.parentId
      } else {
        currentHeading.parentId = 0
        currentParent = 0
      }
    }

    headingList.push(currentHeading)
  })

  return headingList
}

export default parseHeadingAST
