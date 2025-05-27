export const capitalizeString = (value: string) => {
  if(!value) return ''
  
  const firstLetter = value.charAt(0).toUpperCase()
  const restString = value.toLowerCase().slice(1, value.length)

  return firstLetter + restString
}
