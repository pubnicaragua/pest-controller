import { ColumnDef } from '@tanstack/react-table'
import { Client } from '@/api/client/type'

export const getColumns = (handleOnClick: (_id: string) => void) => {
  const columns: ColumnDef<Client>[] = [
    {
      header: 'Cliente',
      accessorKey: 'client',
      accessorFn: fn => `${fn.businessName}`,
    },
    {
      header: 'N˚ RUT',
      accessorKey: 'rut',
      accessorFn: fn => fn.rut,
    },
    {
      header: 'Correo electrónico',
      accessorKey: 'email',
      accessorFn: fn => fn.email,
    },
    {
      header: 'Dirección',
      accessorKey: 'address',
      accessorFn: fn => `${fn.address}, ${fn.commune}, ${fn.region}`,
    },
    {
      header: 'Contacto',
      accessorKey: 'contact',
      accessorFn: fn => fn.contact,
    },
    {
      header: '',
      accessorKey: 'actions',
      size: 50,
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
