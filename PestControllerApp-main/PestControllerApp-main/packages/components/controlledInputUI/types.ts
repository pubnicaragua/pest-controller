import { Control, ErrorOption, FieldValues, Path } from 'react-hook-form'

export type ControlledInputUIProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  inputType?: 'text' | 'password' | 'number'
  label: string
  error?: ErrorOption
  filter?: (value: string) => string
  rightIcon?: JSX.Element
  iconOnClick?: () => void
  addon?: string
  leftAddon?: string
  disabled?: boolean
  isMobile?: boolean
}
