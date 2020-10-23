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
    if (content.type === 'text') {
      const text = content.value
      link.text += text
      link.href += text.replace(/\s+/g, blankSpaceReplaceText) 
    } else if (content.type === 'link') {
      const text = content.children[0]?.value as string
      link.text += text || ''
      link.href += text || 'none'
    }
  })

  return link
}

export default extractText
