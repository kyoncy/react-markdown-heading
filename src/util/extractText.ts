import { HeadingWithId } from '../util/parseHeadingAST'

type content = {
  text: string
  href: string
}

const extractText = (
  content: HeadingWithId,
  blankSpaceReplaceText = '-'
): content => {
  const link: content = {
    text: content.text,
    href: `#${content.text.replace(/\s+/g, blankSpaceReplaceText)}`,
  }
  const markdownLink = /\[(.+)\]\((.+)?\)/gi.exec(link.text)
  if (markdownLink) {
    link.text = markdownLink[1]
    link.href = markdownLink[2]
  }

  return link
}

export default extractText
