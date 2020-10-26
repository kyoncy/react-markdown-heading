import { PhrasingContent } from 'mdast'
import parseText from './parseText'

type content = {
  text: string
  href: string
}

const extractText = (
  contents: PhrasingContent[],
  blankSpaceReplaceText = '-'
): content => {
  let link = {
    text: '',
    href: '#',
  }

  contents.forEach((content) => {
    link = parseText(content, link, blankSpaceReplaceText)
  })

  return link
}

export default extractText
