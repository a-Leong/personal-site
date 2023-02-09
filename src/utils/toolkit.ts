export function debounce<T extends Function>(cb: T, wait = 20) {
  let h = 0
  // eslint-disable-next-line
  const callable = (...args: any) => {
    clearTimeout(h)
    h = setTimeout(() => cb(...args), wait)
  }
  // eslint-disable-next-line
  return (callable as any) as T
}
