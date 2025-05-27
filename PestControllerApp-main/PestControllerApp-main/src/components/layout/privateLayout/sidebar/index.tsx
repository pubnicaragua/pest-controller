/* eslint-disable @next/next/no-img-element */
import { motion, Variants } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { SidebarProps } from '../types'
import { SidebarFooterOptionList, SidebarOptionList } from '@/constants/sidebarOptions'
import CardOption from './cardOption'
import { DrawerIcon, DropDownIcon, UserIcon } from '../../../../../packages/icons'
import { colors } from '../../../../../tailwind.config'
import { initialSession, useSession } from '@/contexts/session'
import { useState } from 'react'

const animateVariats: Variants = {
  sidebar: {
    width: '300px',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  sidebarCollapsed: {
    width: '72px',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, handleIsCollapsed }) => {
  const [showOptions, setShowOptions] = useState<boolean>()

  const router = useRouter()
  const pathname = usePathname()
  const { session, setSession } = useSession()

  const handleOnLogout = () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_SIGNIN_TOKEN)
    setSession(initialSession.session)
    router.push('/auth')
  }

  const handleShowOptions = () => {
    setShowOptions(!showOptions)
  }

  return (
    <motion.div
      className="bg-sidebar text-gray-light h-screen fixed pt-6"
      variants={animateVariats}
      animate={isCollapsed ? 'sidebarCollapsed' : 'sidebar'}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* HEADER */}
          <div
            className="flex mb-8 items-center px-3"
            style={{ justifyContent: isCollapsed ? 'center' : 'space-between' }}
          >
            <i className="cursor-pointer" onClick={() => handleIsCollapsed()}>
              <DrawerIcon width="36px" height="36px" fill="#ffffff" />
            </i>
            {!isCollapsed && (
              <img className="w-4/5" src="/images/pest-logo-2.png" alt="pest controller app" />
            )}
          </div>

          {/* OPTIONS */}
          {SidebarOptionList.map(option => (
            <CardOption
              key={option.route}
              option={option}
              pathname={pathname}
              role={session.role}
              isCollapsed={isCollapsed}
              onCollapsed={handleIsCollapsed}
            />
          ))}
        </div>

        {/* FOOTER */}
        <div className="py-4 pr-4">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div>
                <i className="w-12 h-12 rounded-full">
                  <UserIcon width="30" height="30" fill="#ffffff" />
                </i>
              </div>
              {!isCollapsed && (
                <div className="flex flex-col justify-center">
                  <span className="font-semibold">{`${session.name} ${session.lastname}`}</span>
                  <span className="text-sm">{session.email}</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div>
                <i className="cursor-pointer" onClick={() => handleShowOptions()}>
                  <DropDownIcon width="24" height="24" fill={colors.gray.light} />
                </i>
              </div>
            )}
          </div>
          <div className={showOptions ? 'block' : 'hidden'}>
            {SidebarFooterOptionList.map(option => (
              <CardOption
                key={option.route}
                option={option}
                pathname={pathname}
                handleOnLogout={handleOnLogout}
                role={session.role}
                isCollapsed={isCollapsed}
                onCollapsed={handleIsCollapsed}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar
