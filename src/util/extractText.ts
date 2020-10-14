import { PhrasingContent } from 'mdast'

type content = {
  text: string
  href: string
}

const extractText = (
  content: PhrasingContent,
  blankSpaceReplaceText = '-'
): content => {
  if (content.type === 'text') {
    const text = content.value
    return {
      text: text,
      href: `#${text.replace(/\s+/g, blankSpaceReplaceText)}`,
    }
  } else if (content.type === 'link') {
    const text = content.children[0].value as string
    return {
      text: text,
      href: content.url,
    }
  } else {
    return {
      text: '',
      href: '',
    }
  }
}

export default extractText
