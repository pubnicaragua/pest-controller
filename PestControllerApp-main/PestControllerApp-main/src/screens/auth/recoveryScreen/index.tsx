import { useState } from 'react'
import { AuthScreenEnum, AuthScreenProps, RecoverValues } from '../types'
import { ButtonUI, ControlledInputUI } from '../../../../packages/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { RecoverYupSchema } from '@/resolvers/authResolverSchemas'
import { useForm } from 'react-hook-form'
import { RecoverPayload } from '@/api/auth/types'
import { api } from '@/api'

const RecoveryScreen: React.FC<AuthScreenProps> = ({
  handleChangeScreen,
  handleSetEmail,
  isMobile,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RecoverYupSchema) })

  const onSubmit = (data: RecoverValues) => {
    setIsLoading(true)
    const payload: RecoverPayload = {
      email: data.email,
    }

    sendMail(payload)
  }

  const sendMail = async (payload: RecoverPayload) => {
    const response = await api.auth.recover(payload)
    if (response.status === 200) {
      handleSetEmail(payload.email)
      handleChangeScreen(AuthScreenEnum.TOKEN)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-full items-center">
      <div className="md:w-4/5">
        <div className="flex flex-col gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white lg:text-text">Recuperar contraseña</h2>
          <p className="text-white lg:text-text">
            Ingresa la dirección de correo electrónico registrada en tu cuenta. Te enviaremos un
            código para restablecer tu contraseña.
          </p>
        </div>
        <div className="flex justify-center w-full h-full">
          <form
            className="flex flex-col items-center md:gap-4 w-full"
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
            <ButtonUI text="Enviar" type="submit" isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default RecoveryScreen
