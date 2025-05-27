'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import RecoveryScreen from '@/screens/auth/recoveryScreen'
import SignInScreen from '@/screens/auth/signInScreen'
import { AuthScreenEnum } from '@/screens/auth/types'
import TokenScreen from '@/screens/auth/tokenScreen'
import CreatePasswordScreen from '@/screens/auth/newPasswordScreen'

const AuthPage: NextPage = () => {
  const [screen, setScreen] = useState<AuthScreenEnum>(AuthScreenEnum.SINGIN)
  const [email, setEmail] = useState<string>('')
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleChangeScreen = (screen: AuthScreenEnum) => {
    setScreen(screen)
  }

  const handleSetEmail = (email: string) => {
    setEmail(email)
  }

  useEffect(() => {
    if (window !== undefined) {
      if (window.screen.width <= 624) setIsMobile(true)
    }
  }, [])

  const renderScreen = () => {
    switch (screen) {
      case AuthScreenEnum.RECOVER:
        return (
          <RecoveryScreen
            handleChangeScreen={handleChangeScreen}
            handleSetEmail={handleSetEmail}
            isMobile={isMobile}
          />
        )

      case AuthScreenEnum.TOKEN:
        return (
          <TokenScreen handleChangeScreen={handleChangeScreen} email={email} isMobile={isMobile} />
        )

      case AuthScreenEnum.CREATE:
        return (
          <CreatePasswordScreen
            handleChangeScreen={handleChangeScreen}
            email={email}
            isMobile={isMobile}
          />
        )

      default:
        return (
          <SignInScreen
            handleChangeScreen={handleChangeScreen}
            handleSetEmail={handleSetEmail}
            isMobile={isMobile}
          />
        )
    }
  }

  return <>{renderScreen()}</>
}

export default AuthPage
