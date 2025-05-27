import Link from 'next/link'
import { DropDownIcon } from '../../../../../../packages/icons'
import { colors } from '../../../../../../tailwind.config'
import { SubmenuOptionProps } from '../../types'
import { useSession } from '@/contexts/session'

const SubmenuOption: React.FC<SubmenuOptionProps> = ({
  option,
  isCollapsed,
  pathname,
  onCollapsed,
}) => {
  const isRoute = pathname === option.route

  const {
    session: { isMobile },
  } = useSession()

  const handleOnClickOption = () => onCollapsed()

  return (
    <div
      key={option.route}
      className={`flex items-center py-4 px-3 rounded-xl ${isRoute && 'bg-primary'} w-full ${
        isMobile && 'ml-8'
      }`}
    >
      <Link
        key={option.route}
        className="w-full"
        href={option.route}
        onClick={() => handleOnClickOption()}
      >
        <div className="flex">
          <div className="flex items-center gap-2">
            <i>{option.icon}</i>
            {((!isMobile && !isCollapsed) || isMobile) && (
              <span className={'text-white'}>{option.title}</span>
            )}
          </div>
          {option.subroutes?.length > 0 && (
            <div>
              <i className="cursor-pointer" onClick={() => {}}>
                <DropDownIcon width="24" height="24" fill={colors.gray.light} />
              </i>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default SubmenuOption
