'use client'

import { useSession } from '@/contexts/session'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type AuthRedirectProps = {
  children: JSX.Element
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const redirectRoute = '/auth'
  const pathname = usePathname()
  const router = useRouter()
  const { session } = useSession()

  const publicRoute = pathname === redirectRoute

  useEffect(() => {
    if (session.logged && publicRoute) router.push('/')

    if (!session.logged && !session.isLoading && !publicRoute) router.push(redirectRoute)
  }, [publicRoute, router, session.logged, session.isLoading])

  return <>{children}</>
}

export default AuthRedirect
