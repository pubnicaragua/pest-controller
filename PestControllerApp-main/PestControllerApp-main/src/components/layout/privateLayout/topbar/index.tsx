/* eslint-disable @next/next/no-img-element */
import { motion, Variants } from 'framer-motion'
import { SidebarFooterOptionList, SidebarOptionList } from '@/constants/sidebarOptions'
import CardOption from '../sidebar/cardOption'
import { initialSession, useSession } from '@/contexts/session'
import { usePathname, useRouter } from 'next/navigation'
import { LineDividerUI } from '../../../../../packages/components'
import { TopbarComponentProps } from '../types'
import { CloseIcon, MenuIcon, UserIcon } from '../../../../../packages/icons'

const animateVariatsTopbarMobile: Variants = {
  topbar: {
    height: '60px',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  topbarCollapsed: {
    height: '100vh',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}

const TopbarComponent: React.FC<TopbarComponentProps> = ({ isCollapsed, onCollapsed }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { session, setSession } = useSession()

  const handleOnLogout = () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_SIGNIN_TOKEN)
    setSession(initialSession.session)
    router.push('/auth')
  }

  return (
    <motion.div
      className="bg-mobile text-gray-light w-screen sticky z-10 h-screen max-h-screen"
      variants={animateVariatsTopbarMobile}
      animate={isCollapsed ? 'topbarCollapsed' : 'topbar'}
    >
      {isCollapsed ? (
        <div className="flex flex-col justify-between h-full pb-4">
          <div className="flex flex-col">
            <div>
              {/* HEADER */}
              <div className="flex justify-between items-center mt-4 mb-8 px-3">
                <img className="w-52" src="/images/pest-logo-2.png" alt="pest controller app" />
                <div>
                  <i onClick={() => onCollapsed()}>
                    <CloseIcon width="18px" height="18px" fill={'#ffffff'} />
                  </i>
                </div>
              </div>

              {/* OPTIONS */}
              <div className="pr-3">
                {SidebarOptionList.map(option => (
                  <CardOption
                    key={option.route}
                    option={option}
                    pathname={pathname}
                    role={session.role}
                    isCollapsed={isCollapsed}
                    onCollapsed={onCollapsed}
                  />
                ))}
              </div>
            </div>
            <LineDividerUI />
            {/* FOOTER */}

            {SidebarFooterOptionList.map(option => (
              <CardOption
                key={option.route}
                option={option}
                pathname={pathname}
                handleOnLogout={handleOnLogout}
                role={session.role}
                isCollapsed={isCollapsed}
                onCollapsed={onCollapsed}
              />
            ))}
          </div>
          <div className="flex items-center justify-between px-3">
            <div className="flex gap-2 items-center">
              <div>
                <i className="w-12 h-12 rounded-full">
                  <UserIcon width="30" height="30" fill="#ffffff" />
                </i>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-semibold">{`${session.name} ${session.lastname}`}</span>
                <span className="text-sm">{session.email}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-between">
          <div>
            <img className="w-48" src="/images/pest-logo-2.png" alt="pest controller app" />
          </div>
          <div>
            <i onClick={() => onCollapsed()}>
              <MenuIcon width="32px" height="32px" fill={'#ffffff'} />
            </i>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default TopbarComponent
