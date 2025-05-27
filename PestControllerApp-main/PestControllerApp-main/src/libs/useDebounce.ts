import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState<string>('')

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debounceValue
}
