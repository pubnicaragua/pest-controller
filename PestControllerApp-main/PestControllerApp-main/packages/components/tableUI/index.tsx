import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { TableUIProps } from './types'

export const TableUI = <T extends object>({ columns, data }: TableUIProps<T>) => {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

  return (
    <div className="p-2 shadow-xl border-solid border-[1px] border-primary-light rounded-lg h-full min-h-fit bg-white">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="text-lg text-left py-2 px-1"
                  style={{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    textAlign: (header.column.columnDef?.meta as any)?.textAlign,
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, i) => (
                <td
                  key={i}
                  className="text-left py-2 px-1"
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
