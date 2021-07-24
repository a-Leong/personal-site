export function generateBricksHtml(string: string, group: number) {
  const wordArr = string.split(' ')
  const spanStyle = `style="transform: translateY(-100vh);"`
  const spannedArr = wordArr.map(word => {
    if (word.startsWith('@')) {
      const [title, link, punctuation] = word.replaceAll('@', '').split('++')
      return `<span class="brick block-${group}" ${spanStyle}><a href="${link}" target="_blank">${title}</a>${punctuation}</span>`
    }
    return `<span class="brick block-${group}" ${spanStyle}>${word}</span>`
  })
  return spannedArr.join(
    `<span class="brick block-${group}" ${spanStyle}>&#160;</span>`,
  )
}
