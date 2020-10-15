import { Heading } from '../types/Heading'

function skipCharsBack(text: string, pos: number, code: number, min: number) {
  if (pos <= min) {
    return pos
  }

  while (pos > min) {
    if (code !== text.charCodeAt(--pos)) {
      return pos + 1
    }
  }
  return pos
}

const calcHeadingDepth = (markdown: string): Heading | null => {
  let pos = 0
  let max = markdown.length

  let ch = markdown.charCodeAt(pos)

  if (ch !== 0x23 || pos >= max) {
    return null
  }

  let level = 1
  ch = markdown.charCodeAt(++pos)
  while (ch === 0x23 && pos < max && level <= 6) {
    level++
    ch = markdown.charCodeAt(++pos)
  }

  if (level > 6) {
    return null
  }

  max = skipCharsBack(markdown, max, 0x20, pos)
  let tmp = skipCharsBack(markdown, max, 0x23, pos)
  if (tmp > pos && markdown.charCodeAt(tmp - 1) === 0x20) {
    max = tmp
  }

  return {
    depth: level as Heading['depth'],
    text: markdown.slice(pos, max).trim(),
  }
}

export default calcHeadingDepth
