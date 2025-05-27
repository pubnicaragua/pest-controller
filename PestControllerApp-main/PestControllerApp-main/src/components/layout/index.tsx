'use client'

import { useSession } from '@/contexts/session'
import PrivateLayout from './privateLayout'
import PublicLayout from './publicLayout'
import { LayoutProps } from './types'
import { LoadingUI } from '../../../packages/components'
import { useEffect, useState } from 'react'
import LandingPage from './landing'

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showLading, setShowLanding] = useState(true)

  const { session } = useSession()

  useEffect(() => {
    if (!session.isLoading) {
      setTimeout(() => {
        setShowLanding(false)
      }, 3000)
    }
  }, [session.isLoading])

  if (session.isLoading)
    return (
      <div className="w-screen h-screen">
        <LoadingUI />
      </div>
    )

  if (session.isMobile && showLading) return <LandingPage />

  if (session.logged) return <PrivateLayout showLanding={showLading}>{children}</PrivateLayout>

  if (!session.logged) return <PublicLayout showLanding={showLading}>{children}</PublicLayout>
}

export default Layout
