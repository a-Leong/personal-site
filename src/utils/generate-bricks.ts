export function generateBricksHtml(string: string, brickClass: string) {
  const arr = string.split(' ')
  const spannedArr = arr.map(word => {
    const spanStyle = `style="display:inline-block"`
    return `<span class="${brickClass}" ${spanStyle}>${word}</span>`
  })
  return spannedArr.join(
    `<span class=${brickClass} style="display:inline-block">&#160;</span>`,
  )
}
