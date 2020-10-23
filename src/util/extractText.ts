import { PhrasingContent } from 'mdast'

type content = {
  text: string
  href: string
}

const extractText = (
  contents: PhrasingContent[],
  blankSpaceReplaceText = '-'
): content => {
  const link = {
    text: '',
    href: '#',
  }

  contents.forEach((content) => {
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
      case 'emphasis': {
        const text = content.children[0]?.value as string
        link.text += text || ''
        link.href += text?.replace(/\s+/g, blankSpaceReplaceText) || ''
        break
      }
    }
  })

  return link
}

export default extractText
