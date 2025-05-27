export type ButtonUIProps = {
  width?: string
  text: string
  type?: 'button' | 'submit'
  classname?: 'primary' | 'secondary'
  onClick?: (...args: unknown[]) => void
  isLoading?: boolean
  disabled?: boolean
  formId?: string
}
