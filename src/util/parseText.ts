import { PhrasingContent } from 'mdast'
import isEmptyArray from './isEmptyArray'

type content = {
  text: string
  href: string
}

const parseText = (
  content: PhrasingContent,
  link: content,
  blankSpaceReplaceText = '-'
): content => {
  switch (content.type) {
    case 'text':
    case 'inlineCode': {
      const text = content.value
      link.text += text
      link.href += text.replace(/\s+/g, blankSpaceReplaceText)
      break
    }
    case 'link':
      if (isEmptyArray(content.children)) break
      return parseText(content.children[0], link, blankSpaceReplaceText)
    case 'strong':
    case 'emphasis': {
      return parseText(content.children[0], link, blankSpaceReplaceText)
    }
  }

  return link
}

export default parseText
