import { PieLabel } from 'recharts'

export type PieChartUIProps = {
  width?: number
  height?: number
  data: { name: string; value: number }[]
  label?: PieLabel
  labelTooltip?: string
}
