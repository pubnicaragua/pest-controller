import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AreaChartUIProps } from './types'
import { RodentIcon } from '../../icons'
import { capitalizeString } from '@/libs/strings'

const CustomTooltip = ({ active = false, payload = [] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <p className="text-lg font-semibold">{capitalizeString(payload[0].name)} capturados</p>
        <div className="flex justify-end gap-1">
          <span className="text-xl font-semibold">{payload[0].value}</span>
          <i>
            <RodentIcon width="28" height="28" fill="#8884d8" />
          </i>
        </div>
      </div>
    )
  }

  return null
}

export const AreaChartUI: React.FC<AreaChartUIProps> = ({ width = 500, height = 300, data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="linear"
          label="Roedores"
          dataKey="roedores"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
