import { Control, ErrorOption, FieldValues, Path } from 'react-hook-form'

export type ControlledSelectUIProps<TFieldValues extends FieldValues = FieldValues> = {
  width?: string
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  placeholder: string
  error?: ErrorOption
  options: { value: string; label: string }[]
  handleOnClick?: (value: string) => void
}
