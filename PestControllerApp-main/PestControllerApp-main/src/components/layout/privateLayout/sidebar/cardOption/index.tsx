import Link from 'next/link'
import { DropDownIcon } from '../../../../../../packages/icons'
import { colors } from '../../../../../../tailwind.config'
import { useState } from 'react'
import { useSession } from '@/contexts/session'
import SubmenuOption from '../subMenuOption'
import { CardOptionProps } from '../../types'

const CardOption: React.FC<CardOptionProps> = ({
  option,
  pathname,
  handleOnLogout,
  onCollapsed,
  isCollapsed,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>()

  const {
    session: { role, isMobile },
  } = useSession()

  const isRoute = pathname === option.route
  const isLogout = option.route === '#'

  const handleShowOptions = () => {
    setShowOptions(!showOptions)
  }

  const handleOnClickOption = () => {
    if (isLogout) {
      handleOnLogout()
    }
    if (isMobile) {
      onCollapsed()
    }
    if (!isMobile && !isCollapsed) {
      onCollapsed()
    }
  }

  if (!option.roles.includes(role)) return null

  const subroutesRole = option.subroutes?.filter(subroute => subroute.roles.includes(role))

  return (
    <>
      <div className={`py-4 px-3 rounded-xl ${isRoute && 'bg-primary'}`}>
        <div className="flex justify-between">
          <Link
            key={option.route}
            className="w-full"
            href={option.route}
            onClick={() => handleOnClickOption()}
          >
            <div className="flex items-center gap-2">
              <i>{option.icon}</i>
              {((!isCollapsed && !isMobile) || isMobile) && (
                <span className={isRoute && 'text-white'}>{option.title}</span>
              )}
            </div>
          </Link>
          {((!isMobile && !isCollapsed) || (isMobile && isCollapsed)) && (
            <>
              {option.subroutes?.length > 0 && subroutesRole.length > 0 && (
                <div>
                  <i className="cursor-pointer" onClick={() => handleShowOptions()}>
                    <DropDownIcon width="24" height="24" fill={colors.gray.light} />
                  </i>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className={showOptions ? `flex ${!isCollapsed && 'ml-8'}` : 'hidden'}>
        {option.subroutes?.map(option => (
          <SubmenuOption
            key={option.route}
            option={option}
            isCollapsed={isCollapsed}
            pathname={pathname}
            onCollapsed={onCollapsed}
          />
        ))}
      </div>
    </>
  )
}

export default CardOption
