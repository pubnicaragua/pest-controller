export type SelectUIProps = {
  width?: string
  label: string
  name: string
  value: string
  placeholder?: string
  options: { value: string; label: string }[]
  onChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void
}
