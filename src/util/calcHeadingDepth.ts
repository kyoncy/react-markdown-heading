import { Heading } from '../types/Heading'

const calcHeadingDepth = (markdown: string): Heading | null => {
  const heading = /^(#*)(\s+)(.*)?$/gi.exec(markdown)

  if (!heading || !heading[3]) {
    return null
  }

  const headingDepth = heading[1].length
  if (headingDepth === 0 || headingDepth > 6) {
    return null
  }

  return {
    depth: headingDepth as Heading['depth'],
    text: heading[3].replace(/(\s+)(#*)(\s*)$/, ''),
  }
}

export default calcHeadingDepth
