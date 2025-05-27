export type ContainerListUIProps = {
  title: string
  description: string
  addBtnText?: string
  handleOnClick?: () => void
  searchInput?: JSX.Element
  filters?: JSX.Element
  showFilters?: boolean
  onShowFilters?: () => void
  children: JSX.Element
  isMobile?: boolean
}
