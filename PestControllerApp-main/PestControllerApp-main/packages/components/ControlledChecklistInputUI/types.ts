import { Control } from 'react-hook-form'

export type ControlledChecklistInputUIProps = {
  width?: string
  border?: 'outlined' | 'underlined'
  control: Control
  name: string
  label?: string
}
