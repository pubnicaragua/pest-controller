import { SidebarOptionType } from '@/components/layout/privateLayout/types'
import {
  ClientsIcon,
  LogoutIcon,
  ReportsIcon,
  ServicesIcon,
  SettingsIcon,
  UserIcon,
} from '../../packages/icons'
import { UserRole } from '@/api/users/type'

export const SidebarOptionList: SidebarOptionType[] = [
  {
    icon: <ServicesIcon width="26px" height="26px" fill="#ffffff" />,
    title: 'Servicios',
    route: '/services',
    roles: [UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.TECHNICAL],
    subroutes: [
      {
        icon: <SettingsIcon width="26px" height="26px" fill="#ffffff" />,
        title: 'Ajustes',
        route: '/services/settings',
        roles: [UserRole.SUPERADMIN],
      },
    ],
  },
  {
    icon: <ClientsIcon width="26px" height="26px" fill="#ffffff" />,
    title: 'Clientes',
    route: '/clients',
    roles: [UserRole.SUPERADMIN, UserRole.ADMIN],
  },
  {
    icon: <UserIcon width="26px" height="26px" fill="#ffffff" />,
    title: 'Usuarios',
    route: '/users',
    roles: [UserRole.SUPERADMIN, UserRole.ADMIN],
  },
  {
    icon: <ReportsIcon width="26px" height="26px" fill="#ffffff" />,
    title: 'Estadísticas generales',
    route: '/reports',
    roles: [UserRole.SUPERADMIN, UserRole.ADMIN],
  },
]

export const SidebarFooterOptionList: SidebarOptionType[] = [
  {
    icon: <SettingsIcon width="26px" height="26px" fill="#ffffff" />,
    title: 'Configuración',
    route: '/settings',
    roles: [UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.TECHNICAL],
  },
  {
    icon: <LogoutIcon width="26px" height="26px" fill="#ffffff" />,
    title: 'Cerrar Sesión',
    route: '#',
    roles: [UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.TECHNICAL],
  },
]
