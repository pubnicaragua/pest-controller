'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { PieChartUIProps } from './types'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#000000']

const CustomTooltip = ({ active = false, payload = [], labelTooltip = 'Total' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="label">
          {labelTooltip}: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    )
  }

  return null
}

export const PieChartUI: React.FC<PieChartUIProps> = ({
  width = 400,
  height = 400,
  data,
  labelTooltip,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          labelLine={false}
          innerRadius={'40%'}
          paddingAngle={2}
          label
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip labelTooltip={labelTooltip} />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
