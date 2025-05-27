import { User, UserRoleTranstale } from '@/api/users/type'
import { capitalizeString } from '@/libs/strings'
import { ColumnDef } from '@tanstack/react-table'
import EnabledUserBadge from '@/components/users/enabledUserBadge'
import { SwitchIcon, SwitchOffIcon, TrashIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'

export const getColumns = (enabledUser: (id: string) => void, deleteUser: (id: string) => void) => {
  const columns: ColumnDef<User>[] = [
    {
      header: 'Nombre y apellido',
      accessorKey: 'name',
      accessorFn: fn => `${fn.name} ${fn.lastname}`,
    },
    {
      header: 'Correo electónico',
      accessorKey: 'email',
      accessorFn: fn => fn.email,
    },
    {
      header: 'N˚ de teléfono',
      accessorKey: 'phoneNumber',
      accessorFn: fn => fn.phoneNumber,
    },
    {
      header: 'Dirección',
      accessorKey: 'address',
      accessorFn: fn => fn.address,
    },
    {
      header: 'Cargo',
      accessorKey: 'role',
      accessorFn: fn => capitalizeString(UserRoleTranstale[fn.role]),
    },
    {
      header: 'Estado',
      accessorKey: 'enabled',
      cell: ({ row }) => <EnabledUserBadge isActive={row.getValue('enabled')} />,
    },
    {
      header: '',
      accessorKey: 'actions',
      size: 40,
      cell: ({ row }) => (
        <i className="cursor-pointer" onClick={() => enabledUser(row.original._id)}>
          {row.getValue('enabled') ? (
            <SwitchIcon width="42" height="42" fill="green" />
          ) : (
            <SwitchOffIcon width="42" height="42" fill="red" />
          )}
        </i>
      ),
    },
    {
      header: '',
      accessorKey: 'remove',
      size: 10,
      cell: ({ row }) => (
        <button className="p-2 md:mr-4" onClick={() => deleteUser(row.original._id)}>
          <TrashIcon width="28" height="28" fill={colors.error} />
        </button>
      ),
    },
  ]

  return columns
}
