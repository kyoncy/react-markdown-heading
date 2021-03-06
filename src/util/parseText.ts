import { PhrasingContent } from 'mdast'

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
    case 'strong':
    case 'emphasis':
      return content.children.length
        ? parseText(content.children[0], link, blankSpaceReplaceText)
        : link
  }

  return link
}

export default parseText
