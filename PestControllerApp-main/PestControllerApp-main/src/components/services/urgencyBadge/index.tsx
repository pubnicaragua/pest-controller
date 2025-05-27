import { UrgencyBadgeProps } from '../types'
import { BadgeUI } from '../../../../packages/components'
import { ServiceUrgency, ServiceUrgencyTranlate } from '@/api/services/type'
import { useSession } from '@/contexts/session'
import { capitalizeString } from '@/libs/strings'

const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency }) => {
  const {
    session: { isMobile },
  } = useSession()

  if (isMobile) {
    let textColor = null

    switch (urgency) {
      case ServiceUrgency['HIGH']:
        textColor = `text-red-dark`
        break

      case ServiceUrgency['MEDIUM']:
        textColor = `text-yellow-dark`
        break

      default:
        textColor = `text-primary-light`
        break
    }
    return (
      <span className={`font-semibold ${textColor}`}>
        {capitalizeString(ServiceUrgencyTranlate[urgency])}
      </span>
    )
  }

  let bgBagde = null

  switch (urgency) {
    case ServiceUrgency['HIGH']:
      bgBagde = `bg-red-dark`
      break

    case ServiceUrgency['MEDIUM']:
      bgBagde = `bg-yellow-dark`
      break

    default:
      bgBagde = `bg-primary-light`
      break
  }

  return <BadgeUI backgroundColor={bgBagde} label={ServiceUrgencyTranlate[urgency]} />
}

export default UrgencyBadge
