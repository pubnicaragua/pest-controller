import { AuthScreenEnum, AuthScreenProps, CreateValues } from '../types'
import { ButtonUI, ControlledInputUI } from '../../../../packages/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreatePasswordYupSchema } from '@/resolvers/authResolverSchemas'
import { useForm } from 'react-hook-form'
import { NewPassword } from '@/api/auth/types'
import { api } from '@/api'
import toast from 'react-hot-toast'
import { useState } from 'react'

const CreatePasswordScreen: React.FC<AuthScreenProps> = ({
  handleChangeScreen,
  email,
  isMobile,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreatePasswordYupSchema) })

  const onSubmit = (data: CreateValues) => {
    setIsLoading(true)
    const payload: NewPassword = {
      ...data,
      email,
    }

    createPassword(payload)
  }

  const createPassword = async (payload: NewPassword) => {
    const response = await api.auth.newPassword(payload)
    if (response.status === 200) {
      handleChangeScreen(AuthScreenEnum.SINGIN)
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
          <h2 className="text-2xl font-bold text-white lg:text-text">Crear una contraseña</h2>
          {/* <p>Ingresa la nueva contraseña</p> */}
        </div>
        <div className="flex justify-center w-full h-full">
          <form
            className="flex flex-col items-center md:gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ControlledInputUI
              control={control}
              name="password"
              label="Contraseña"
              inputType="password"
              error={errors?.password}
              isMobile={isMobile}
            />
            <ControlledInputUI
              control={control}
              name="passwordConfirm"
              label="Confirmar contraseña"
              inputType="password"
              error={errors?.passwordConfirm}
              isMobile={isMobile}
            />
            <ButtonUI text="Enviar" type="submit" isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePasswordScreen
