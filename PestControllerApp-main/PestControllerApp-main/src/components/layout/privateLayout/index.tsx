'use client'

import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import Sidebar from './sidebar'
// import { PlusIcon } from '../../../../packages/icons'
import TopbarComponent from './topbar'
import LandingPage from '../landing'

export type PrivateLayoutProps = {
  children: JSX.Element
  showLanding: boolean
}

const animateVariatsContainer: Variants = {
  sidebar: {
    width: 'calc(100vw - 300px)',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  sidebarCollapsed: {
    width: 'calc(100vw - 72px)',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}

const animateVariatsContainerMobile: Variants = {
  topbar: {
    height: '100%',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  topbarCollapsed: {
    display: 'none',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children, showLanding }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleIsCollapsed = () => setIsCollapsed(prevState => !prevState)

  useEffect(() => {
    if (window !== undefined) {
      if (window.screen.width <= 620) setIsMobile(true)
    }
  }, [])

  if (isMobile && showLanding) return <LandingPage />

  if (isMobile)
    return (
      <motion.div className="flex flex-col h-screen w-screen max-h-screen max-w-[100vw]">
        <TopbarComponent isCollapsed={isCollapsed} onCollapsed={handleIsCollapsed} />
        <motion.div
          className="w-screen min-h-fit min-w-[100vw] max-w-[100vw] bg-gray-200 py-3 px-3"
          variants={animateVariatsContainerMobile}
          animate={isCollapsed ? 'topbarCollapsed' : 'topbar'}
        >
          {children}
        </motion.div>
      </motion.div>
    )

  return (
    <motion.div className="flex">
      <Sidebar isCollapsed={isCollapsed} handleIsCollapsed={handleIsCollapsed} />
      <motion.div
        className="px-2 h-screen fixed right-0 bg-gray-200 overflow-y-scroll"
        variants={animateVariatsContainer}
        animate={isCollapsed ? 'sidebarCollapsed' : 'sidebar'}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default PrivateLayout
