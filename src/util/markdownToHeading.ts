import calcHeadingDepth from './calcHeadingDepth'
import { Heading } from '../types/Heading'

const markdownToHeading = (markdown: string): Heading[] => {
  const allLines = markdown.split(/\r\n|\n|\r/)
  const headingList: Heading[] = []

  allLines.forEach((line) => {
    const heading = calcHeadingDepth(line)
    if (heading) {
      headingList.push(heading)
    }
  })

  return headingList
}

export default markdownToHeading
