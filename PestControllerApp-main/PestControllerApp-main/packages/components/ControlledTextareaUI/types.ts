import { Control, ErrorOption, FieldValues, Path } from 'react-hook-form'

export type ControlledTextareaUIProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  error?: ErrorOption
}
