import { BadgeUI } from '../../../../packages/components'
import { DotIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'
import { EnabledUserBadgeProps } from '../types'

const EnabledUserBadge: React.FC<EnabledUserBadgeProps> = ({ isActive }) => {
  return (
    <BadgeUI
      backgroundColor={isActive ? `bg-green-badge` : `bg-gray-badge`}
      textColor={isActive ? 'text-green-dark' : 'text-gray'}
      label={isActive ? 'Activo' : 'Inactivo'}
      icon={
        <DotIcon
          width="9px"
          height="9px"
          fill={isActive ? colors.green.dark : colors.gray.DEFAULT}
        />
      }
    />
  )
}

export default EnabledUserBadge
