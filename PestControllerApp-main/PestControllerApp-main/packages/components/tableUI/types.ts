import { ColumnDef } from '@tanstack/react-table'

export type TableUIProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
}
