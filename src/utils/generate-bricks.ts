export function generateBricksHtml(string: string, group: number) {
  const wordArr = string.split(' ')
  const spanStyle = `style="transform: translateY(-100vh);"`
  const spannedArr = wordArr.map(word => {
    if (word.startsWith('@icon@')) {
      // TODO
      const [title, link, punctuation] = word
        .replaceAll('@icon@', '')
        .split('++')
      return `<span class="brick block-${group}" ${spanStyle}><a href="${link}" target="_blank">${title}</a>${punctuation}</span>`
    } else if (word.startsWith('@link@')) {
      const [title, link, punctuation] = word
        .replaceAll('@link@', '')
        .split('++')
      return `<span class="brick block-${group}" ${spanStyle}><a href="${link}" target="_blank">${title}</a>${punctuation}</span>`
    } else {
      return `<span class="brick block-${group}" ${spanStyle}>${word}</span>`
    }
  })
  return spannedArr.join(
    `<span class="brick block-${group}" ${spanStyle}>&#160;</span>`,
  )
}
