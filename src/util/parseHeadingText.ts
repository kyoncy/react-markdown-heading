import { HeadingWithId } from './parseHeadingAST'
import extractText from './extractText'

export interface Heading extends HeadingWithId {
  text: string
  href: string
  duplicateCount: number
}

const parseHeadingText = (
  headingList: HeadingWithId[],
  blankSpaceReplaceText = '-'
): Heading[] => {
  const parsedHeadingList: Heading[] = []

  headingList.forEach((item) => {
    const { text, href } = extractText(item.children, blankSpaceReplaceText)
    const duplicateCount = parsedHeadingList.filter(
      (item) => item.href === href
    ).length

    parsedHeadingList.push({ ...item, text, href, duplicateCount })
  })

  parsedHeadingList.forEach((item) => {
    const { href, duplicateCount } = item
    item.href =
      href + (duplicateCount ? `${blankSpaceReplaceText}${duplicateCount}` : '')
  })

  return parsedHeadingList
}

export default parseHeadingText
