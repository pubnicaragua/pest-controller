export const allowedInputs = /^[kK0-9_.-]*$/

export const formatRut = (inputString: string, min = 2, max = 10) => {
  if (inputString.length === 0) return ''

  if (allowedInputs.test(inputString) === false) return inputString.slice(0, -1)

  let content = null
  let identifier = null
  let filteredStr = null
  const prevStr = inputString

  if (inputString?.length > 0) content = inputString?.slice(0, -1)

  if (inputString?.length > 1) identifier = inputString[inputString?.length - 1]

  if (content && identifier)
    filteredStr = content.replace(/[^\d]/g, '') + identifier?.replace(/[^0-9kK]$/g, '')
  else filteredStr = inputString.replace(/[^\d]/g, '')

  if (!filteredStr && !identifier) return ''

  inputString = filteredStr

  if (inputString.length < min || inputString.length > max) return prevStr.slice(0, max + 3)
  else {
    const v = inputString.slice(0, -1)

    let reg = new RegExp(/^[0-9]*$/g)

    if (!reg.test(v)) return null

    const last = inputString.slice(-1)

    reg = new RegExp(/^[0-9kK]$/g)

    if (!reg.test(last)) return null

    let start = -2
    let end = -1
    let count = 0
    let text = `-${last}`

    while (true) {
      const val = inputString.slice(start, end)

      if (!val) break

      if (count > 2) {
        text = `${val}.${text}`
        count = 1
        start--
        end--
      } else {
        count++
        start--
        end--
        text = val + text
      }
    }

    if (text.startsWith('.')) text = text.substring(1)

    return text
  }
}
