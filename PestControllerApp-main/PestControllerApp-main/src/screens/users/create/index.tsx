import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonUI, ControlledInputUI, ControlledSelectUI } from '../../../../packages/components'
import { FormUI } from '../../../../packages/components/formUI'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterUserSchema } from '@/resolvers/registerUserResolver'
import { RegisterUserPayload, UserRole, UserRoleTranstale } from '@/api/users/type'
import { RegionsAndCommunes } from '@/constants/regionsAndCommunes'
import { capitalizeString } from '@/libs/strings'
import { Roles } from '@/constants/roles'
import { formatRut } from '@/libs/formatRut'
import { api } from '@/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const RegisterUserScreen: React.FC = () => {
  const [region, setRegion] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterUserSchema),
  })

  const onSubmit = (data: RegisterUserPayload) => {
    setIsLoading(true)
    saveUser(data)
  }

  const saveUser = async (payload: RegisterUserPayload) => {
    const response = await api.users.registerNewUser(payload)
    if (response.status === 201) {
      toast.success(response.message)
      router.push('/users')
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  const handleSetRegion = (value: string) => {
    setRegion(value)
  }

  const regionOptions = () => {
    return RegionsAndCommunes.map(({ region }) => ({ value: region, label: region }))
  }

  const communeOptions = (region: string) => {
    return RegionsAndCommunes.find(regions => regions.region === region)?.communes.map(commune => ({
      value: commune,
      label: commune,
    }))
  }

  const roleOptions = () => {
    return Roles.filter(role => role !== UserRole.SUPERADMIN).map(role => ({
      value: role,
      label: capitalizeString(UserRoleTranstale[role]),
    }))
  }

  return (
    <FormUI title="Crear cuenta" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:gap-3 lg:flex-row">
        <ControlledInputUI
          control={control}
          name="name"
          label="Nombres"
          inputType="text"
          error={errors.name}
        />
        <ControlledInputUI
          control={control}
          name="lastname"
          label="Apellidos"
          inputType="text"
          error={errors.lastname}
        />
      </div>
      <div className="flex flex-col lg:gap-3 lg:flex-row">
        <ControlledInputUI
          control={control}
          name="phoneNumber"
          label="Número de teléfono"
          inputType="number"
          error={errors.phoneNumber}
        />
        <ControlledInputUI
          control={control}
          name="email"
          label="Correo electrónico"
          inputType="text"
          error={errors.email}
        />
      </div>
      <div className="flex flex-col lg:gap-3 lg:flex-row">
        <ControlledSelectUI
          width="lg:w-1/2"
          control={control}
          name="region"
          label="Región"
          placeholder="Seleccione una region"
          error={errors.region}
          options={regionOptions()}
          handleOnClick={value => handleSetRegion(value)}
        />
        <ControlledSelectUI
          width="lg:w-1/2"
          control={control}
          name="commune"
          label="Comuna"
          placeholder="Seleccione una comuna"
          error={errors.commune}
          options={communeOptions(region)}
        />
      </div>
      <div className="flex flex-col lg:gap-3 lg:flex-row">
        <ControlledInputUI
          control={control}
          name="address"
          label="Dirección"
          inputType="text"
          error={errors.address}
        />
        <ControlledInputUI
          control={control}
          name="rut"
          label="Rut"
          inputType="text"
          error={errors.rut}
          filter={value => formatRut(value)}
        />
      </div>
      <ControlledSelectUI
        width="lg:w-1/2"
        control={control}
        name="Role"
        label="Perfil"
        placeholder="Seleccione el role"
        options={roleOptions()}
      />
      <div className="flex justify-center">
        <ButtonUI text="Registrar usuario" type="submit" isLoading={isLoading} />
      </div>
    </FormUI>
  )
}
export default RegisterUserScreen
