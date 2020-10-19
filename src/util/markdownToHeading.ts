import calcHeadingDepth from './calcHeadingDepth'
import { Heading } from '../types/Heading'

const calcCodeBlock = (text: string): boolean => {
  return /^(```)/gi.test(text)
}

const markdownToHeading = (markdown: string): Heading[] => {
  const allLines = markdown.split(/\r\n|\n|\r/)
  const headingList: Heading[] = []

  let isCodeBlock = false
  allLines.forEach((line) => {
    if (calcCodeBlock(line)) {
      isCodeBlock = !isCodeBlock
      return
    }

    const heading = calcHeadingDepth(line)
    if (heading && !isCodeBlock) {
      headingList.push(heading)
    }
  })

  return headingList
}

export default markdownToHeading
