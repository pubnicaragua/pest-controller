import { AuthScreenEnum, AuthScreenProps, TokenValues } from '../types'
import { useForm } from 'react-hook-form'
import { ButtonUI, ControlledInputUI } from '../../../../packages/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { TokenYupSchema } from '@/resolvers/authResolverSchemas'
import { TokenPayload } from '@/api/auth/types'
import { api } from '@/api'
import toast from 'react-hot-toast'
import { useState } from 'react'

const TokenScreen: React.FC<AuthScreenProps> = ({ handleChangeScreen, email, isMobile }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TokenYupSchema) })

  const onSubmit = (data: TokenValues) => {
    setIsLoading(true)
    const payload: TokenPayload = {
      email,
      token: String(data.token),
    }

    verifyToken(payload)
  }

  const verifyToken = async (payload: TokenPayload) => {
    const response = await api.auth.verifyToken(payload)
    if (response.status === 200) {
      handleChangeScreen(AuthScreenEnum.CREATE)
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-full items-center">
      <div className="md:w-4/5">
        <div className="flex flex-col gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white lg:text-text">
            Verifique su correo electrónico
          </h2>
          <p className="text-white lg:text-text">
            Le hemos enviado un codigo a su correo electrónico. Ingréselo aquí abajo.
          </p>
        </div>
        <div className="flex justify-center w-full h-full">
          <form
            className="flex flex-col items-center md:gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ControlledInputUI
              control={control}
              name="token"
              label="Código de verificación"
              inputType="text"
              error={errors?.token}
              isMobile={isMobile}
            />
            <ButtonUI text="Enviar" type="submit" isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default TokenScreen
