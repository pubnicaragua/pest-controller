/* eslint-disable @next/next/no-img-element */

import { useForm } from 'react-hook-form'
import { AuthScreenEnum, AuthScreenProps } from '../types'
import { ButtonUI, ControlledInputUI } from '../../../../packages/components'
import { SignInPayload, SignInResponse } from '@/api/auth/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignInYupSchema } from '@/resolvers/authResolverSchemas'
import { api } from '@/api'
import toast from 'react-hot-toast'
import { useSession } from '@/contexts/session'
import { ViewIcon, ViewOffIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'
import { useState } from 'react'

const SignInScreen: React.FC<AuthScreenProps> = ({
  handleChangeScreen,
  handleSetEmail,
  isMobile,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { session, setSession } = useSession()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignInYupSchema) })

  const onSubmit = (data: SignInPayload) => {
    setIsLoading(true)
    signIn(data)
  }

  const handleShowPassword = () => setShowPassword(prevState => !prevState)

  const signIn = async (payload: SignInPayload) => {
    const response = await api.auth.signIn<SignInResponse>(payload)
    if (response.status === 200) {
      if (!response.data.user.enabled) {
        toast.error('Usuario deshabailitado! Pongase en contacto con el administrador')
      } else {
        localStorage.setItem(process.env.NEXT_PUBLIC_SIGNIN_TOKEN, response.data.token)
        setSession({ ...session, _id: response.data.user._id })
      }
    } else if (response.status === 202) {
      toast.success(response.message)
      handleSetEmail(payload.email)
      handleChangeScreen(AuthScreenEnum.CREATE)
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  const icon = () => {
    switch (showPassword) {
      case true:
        return <ViewIcon width="20px" height="20px" fill={colors.gray.DEFAULT} />

      default:
        return <ViewOffIcon width="20px" height="20px" fill={colors.gray.DEFAULT} />
    }
  }

  return (
    <div className="flex flex-col h-full px-2">
      <div className="flex justify-center w-full mt-4 mb-10">
        <img
          className="w-full lg:w-4/5"
          src={isMobile ? '/images/pest-logo-2.png' : '/images/pest-logo.png'}
          alt="pest controller app"
        />
      </div>
      <div className="flex justify-center w-full h-full">
        <form
          className="flex flex-col items-center md:gap-4 w-full md:w-4/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ControlledInputUI
            control={control}
            name="email"
            label="Correo electrónico"
            inputType="text"
            error={errors?.email}
            isMobile={isMobile}
          />
          <ControlledInputUI
            control={control}
            name="password"
            label="Contraseña"
            inputType={showPassword ? 'text' : 'password'}
            error={errors?.password}
            rightIcon={icon()}
            iconOnClick={() => handleShowPassword()}
            isMobile={isMobile}
          />
          <ButtonUI width="w-full" text="Iniciar sesión" type="submit" isLoading={isLoading} />
        </form>
      </div>
      <div className="flex justify-center w-full mt-6">
        <button
          className="bg-transparent text-white lg:text-gray hover:underline"
          onClick={() => handleChangeScreen(AuthScreenEnum.RECOVER)}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  )
}

export default SignInScreen
