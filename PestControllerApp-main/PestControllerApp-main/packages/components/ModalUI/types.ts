export type ModalUIProps = {
  title: string
  visible: boolean
  children: JSX.Element | JSX.Element[]
  onClose: () => void
}
