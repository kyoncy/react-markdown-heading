import { HeadingWithId } from '../util/parseHeadingAST'

type content = {
  text: string
  href: string
}

const extractText = (
  content: HeadingWithId,
  blankSpaceReplaceText = '-'
): content => {
  const text = content.text
  return {
    text: text,
    href: `#${text.replace(/\s+/g, blankSpaceReplaceText)}`,
  }
  // TODO: add case content type link
}

export default extractText
