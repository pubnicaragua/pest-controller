import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { api } from '@/api'
import { ButtonUI, ControlledInputUI, ControlledSelectUI } from '../../../../packages/components'
import { FormUI } from '../../../../packages/components/formUI'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegionsAndCommunes } from '@/constants/regionsAndCommunes'
import { formatRut } from '@/libs/formatRut'
import { UpdateProfileSchema } from '@/resolvers/updateProfileSchema'
import { UpdateUserPayload } from '@/api/users/type'
import { useSession } from '@/contexts/session'

const UpdateProfileScreen: React.FC = () => {
  const [region, setRegion] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { session } = useSession()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(UpdateProfileSchema),
  })

  const onSubmit = data => {
    setIsLoading(true)
    updateUser(data)
  }

  const updateUser = async (payload: UpdateUserPayload) => {
    const response = await api.users.updateUser(session._id, payload)
    if (response.status === 201) {
      toast.success(response.message)
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

  const setValues = () => {
    setValue('name', session['name'])
    setValue('lastname', session['lastname'])
    setValue('phoneNumber', Number(session['phoneNumber']))
    setValue('email', session['email'])
    setValue('region', session['region'])
    setValue('commune', session['commune'])
    setValue('rut', session['rut'])
    setValue('address', session['address'])
    setRegion(session['region'])
  }

  useEffect(() => {
    if (session._id) {
      setValues()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session._id])

  return (
    <FormUI title="Actualizar perfil" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 flex-col lg:flex-row">
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
      <div className="flex gap-3 flex-col lg:flex-row">
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
          disabled
        />
      </div>
      <div className="flex gap-3 flex-col lg:flex-row">
        <ControlledSelectUI
          width="lg:w-1/2"
          control={control}
          name="region"
          label="Region"
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
      <div className="flex gap-3 flex-col lg:flex-row">
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
      {/* <ControlledSelectUI
        width="lg:w-1/2"
        control={control}
        name="Role"
        label="Perfil"
        placeholder="Seleccione el role"
        options={roleOptions()}
      /> */}
      <div className="flex justify-center">
        <ButtonUI text="Actualizar" type="submit" isLoading={isLoading} />
      </div>
    </FormUI>
  )
}
export default UpdateProfileScreen
