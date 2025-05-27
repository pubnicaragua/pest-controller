import { UserRole } from '@/api/users/type'

export type SidebarProps = {
  isCollapsed: boolean
  handleIsCollapsed: () => void
}

export type SidebarOptionType = {
  icon: JSX.Element
  title: string
  route: string
  roles: UserRole[]
  subroutes?: SidebarOptionType[]
}

export type TopbarComponentProps = {
  isCollapsed: boolean
  onCollapsed: () => void
}

export type SubmenuOptionProps = {
  option: SidebarOptionType
  isCollapsed: boolean
  pathname: string
  onCollapsed: () => void
}

export type CardOptionProps = {
  option: SidebarOptionType
  pathname: string
  handleOnLogout?: () => void
  role: UserRole
  isCollapsed: boolean
  onCollapsed: () => void
}
