import { ServiceStatus, ServiceStatusTranslate } from '@/api/services/type'
import { StatusBadgeProps } from '../types'
import { BadgeUI } from '../../../../packages/components'
import { useSession } from '@/contexts/session'

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const {
    session: { isMobile },
  } = useSession()

  let bgBagde = null

  switch (status) {
    case ServiceStatus['OVERDUE']:
      bgBagde = `bg-red-dark`
      break

    case ServiceStatus['IN PROGRESS']:
      bgBagde = `bg-blue-dark`
      break

    case ServiceStatus['DONE']:
      bgBagde = `bg-primary-light`
      break

    default:
      bgBagde = `bg-gray`
      break
  }

  // if (isMobile) return <span>{capitalizeString(ServiceStatusTranslate[status])}</span>

  return (
    <BadgeUI
      width="100%"
      backgroundColor={bgBagde}
      label={ServiceStatusTranslate[status]}
      isMobile={isMobile}
    />
  )
}

export default StatusBadge
