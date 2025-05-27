import { Service } from '@/api/services/type'
import StatusBadge from '@/components/services/statusBadge'
import UrgencyBadge from '@/components/services/urgencyBadge'
import { capitalizeString } from '@/libs/strings'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import locale from 'dayjs/locale/es'

dayjs.locale(locale)

export const getColumns = (handleOnClick: (_id: string) => void) => {
  const columns: ColumnDef<Service>[] = [
    {
      header: 'Tipo de servicio',
      accessorKey: 'serviceType',
      accessorFn: fn => capitalizeString(fn.serviceType),
      size: 200,
    },
    {
      header: 'Cliente',
      accessorKey: 'client',
      accessorFn: fn => (fn.clientId ? fn.clientId.businessName : ''),
    },
    {
      header: 'Dirección',
      accessorKey: 'address',
      accessorFn: fn => fn.address,
      size: 300,
    },
    {
      header: 'Fecha de servicio',
      accessorKey: 'serviceDate',
      accessorFn: fn => dayjs(fn.serviceDate).format('DD MMMM YYYY'),
    },
    {
      header: 'Urgencia',
      accessorKey: 'urgency',
      cell: ({ row }) => <UrgencyBadge urgency={row.getValue('urgency')} />,
      size: 150,
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
      size: 120,
    },
    {
      header: '',
      accessorKey: 'actions',
      cell: ({ row }) => (
        <button
          className="border-[1px] border-secondary rounded-lg px-2 py-1 text-secondary"
          onClick={() => handleOnClick(row.original._id)}
        >
          Ver detalle
        </button>
      ),
    },
  ]

  return columns
}
