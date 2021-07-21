export function generateBricksHtml(string: string, brickClass: string) {
  const arr = string.split(' ')
  const spannedArr = arr.map(word => {
    const spanStyle = `style="transform: translateY(-50vh)"`
    return `<span class="${brickClass}" ${spanStyle}>${word}</span>`
  })
  return spannedArr.join(`<span class=${brickClass}>&#160;</span>`)
}
