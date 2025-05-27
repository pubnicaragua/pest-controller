import { ChangeEvent } from 'react'

export type InputProps = {
  width?: string
  border?: 'outlined' | 'underlined'
  placeholder?: string
  name?: string
  inputType?: 'text' | 'number'
  value?: string | number
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}
