'use client'

import { api } from '@/api'
import { GetMeResponse } from '@/api/auth/types'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Session, SessionContextType } from './types'

export const initialSession: SessionContextType = {
  session: {
    logged: false,
    _id: '',
    isLoading: true,
    isMobile: false,
  },
  setSession: ({}: Session) => {},
  resetSession: () => {},
}

export const SessionContext = createContext<SessionContextType>(initialSession)

export const SessionProvider = ({ children }): JSX.Element => {
  const [session, setSession] = useState<Session>(initialSession.session)

  const resetSession = useCallback(() => setSession(initialSession.session), [setSession])

  useEffect(() => {
    let isMobile: boolean = false

    if (window !== undefined) {
      if (window.screen.width <= 624) isMobile = true
    }

    api.auth.getMe<GetMeResponse>().then(response => {
      if (response.status === 200) {
        const user = response.data.data

        if (user && !user.enabled) {
          resetSession()
        }

        if (user) {
          setSession(prevState => ({
            ...prevState,
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            region: user.region,
            commune: user.commune,
            address: user.address,
            email: user.email,
            phoneNumber: user.phoneNumber,
            rut: user.rut,
            role: user.role,
            createdAt: user.createdAt,
            enabled: user.enabled,
            logged: true,
            isMobile,
          }))
        }
      }

      setSession(prevState => ({ ...prevState, isLoading: false }))
    })
  }, [session._id, resetSession])

  return (
    <SessionContext.Provider value={{ session, setSession, resetSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(SessionContext)

  if (context === undefined) {
    throw new Error('useContextSession must be used within a SessionProvider')
  }

  return context
}
