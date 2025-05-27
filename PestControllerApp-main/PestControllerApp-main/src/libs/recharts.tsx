import { PestsReport } from '@/api/reports/types'
import dayjs from 'dayjs'

const RADIAN = Math.PI / 180
export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (percent === 0) return null

  return (
    <text
      x={x}
      y={y}
      fill="black"
      fontSize={18}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >{`${(percent * 100).toFixed(0)}%`}</text>
  )
}

export const formatPestReport = (pestsData: PestsReport[]) => {
  return pestsData?.map(pest => ({
    name: dayjs(pest.serviceDate).format('DD/MM/YYYY') || 'N/A',
    roedores: pest.total,
  }))
}
