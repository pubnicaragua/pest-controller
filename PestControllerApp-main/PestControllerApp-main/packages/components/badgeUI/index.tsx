import { capitalizeString } from '@/libs/strings'
import { BadgeUIProps } from './types'

export const BadgeUI: React.FC<BadgeUIProps> = ({
  width = 'fit-content',
  backgroundColor,
  textColor = 'text-white',
  label,
  icon,
  isMobile = false,
}) => {
  return (
    <div
      className={`flex gap-2 items-center w-fit px-2 py-1 rounded-lg min-w-14 justify-center ${backgroundColor} min-w-32`}
      style={{ width: isMobile ? 'auto' : width }}
    >
      {icon && icon}
      <span className={textColor}>{capitalizeString(label)}</span>
    </div>
  )
}
