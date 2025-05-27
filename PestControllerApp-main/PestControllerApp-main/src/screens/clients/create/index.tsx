import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { api } from '@/api'
import { ButtonUI, ControlledInputUI, ControlledSelectUI } from '../../../../packages/components'
import { FormUI } from '../../../../packages/components/formUI'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegionsAndCommunes } from '@/constants/regionsAndCommunes'
import { formatRut } from '@/libs/formatRut'
import { RegisterClientPayload } from '@/api/client/type'
import { RegisterClientSchema } from '@/resolvers/registerClientSchema'
import GoogleMapsModal from '@/components/googleMapsModal'
import { MapMarkerIcon } from '../../../../packages/icons'

import { getAddressFromLatLng, getLatLngFromAddress, getOnlyLocalAddress } from '@/libs/geocode'
import { colors } from '../../../../tailwind.config'

const RegisterClientScreen: React.FC = () => {
  const [region, setRegion] = useState<string>('')
  const [commune, setCommune] = useState<string>('')
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>()
  const [showGoogleMaps, setShowGoogleMaps] = useState<boolean>(false)
  const [defaultCenterMap, setDefaultCenterMap] = useState<{ lat: number; lng: number }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterClientSchema),
  })

  const onSubmit = data => {
    setIsLoading(true)

    const payload: RegisterClientPayload = {
      ...data,
      geolocalization: { lat: markerPosition.lat, lng: markerPosition.lng },
    }
    saveClient(payload)
  }

  const saveClient = async (payload: RegisterClientPayload) => {
    const response = await api.clients.registerNewClient(payload)
    if (response.status === 201) {
      toast.success(response.message)
      router.push('/clients')
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  const handleOnShowGoogleMaps = () => {
    setShowGoogleMaps(prevState => !prevState)
  }

  const getLatLng = async () => {
    const latLng = await getLatLngFromAddress(`${commune}, ${region}`)
    setDefaultCenterMap(latLng)
  }

  const saveGeorefence = async () => {
    const address = await getAddressFromLatLng({ lat: markerPosition.lat, lng: markerPosition.lng })
    if (address) {
      const finalAddress = getOnlyLocalAddress(address)
      setValue('address', finalAddress)
      errors.address = null
    }
    handleOnShowGoogleMaps()
  }

  const handleMarkerPosition = (lat: number, lng: number) => {
    setMarkerPosition({ lat, lng })
  }

  const handleSetRegion = (value: string) => {
    setRegion(value)
  }

  const handleSetCommune = (value: string) => {
    setCommune(value)
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

  useEffect(() => {
    if (commune) {
      getLatLng()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commune, region])

  return (
    <>
      <FormUI title="Registrar cliente" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:gap-3 lg:flex-row">
          <ControlledInputUI
            control={control}
            name="rut"
            label="N˚ RUT"
            inputType="text"
            error={errors.rut}
            filter={value => formatRut(value)}
          />
          <ControlledInputUI
            control={control}
            name="businessName"
            label="Cliente"
            inputType="text"
            error={errors.businessName}
          />
        </div>
        <div className="flex flex-col lg:gap-3 lg:flex-row">
          <ControlledInputUI
            control={control}
            name="contact"
            label="Contacto cliente"
            inputType="text"
            error={errors.contact}
          />
          <ControlledInputUI
            control={control}
            name="email"
            label="Correo electrónico"
            inputType="text"
          />
        </div>
        <div className="flex flex-col lg:gap-3 lg:flex-row">
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
            handleOnClick={value => handleSetCommune(value)}
          />
        </div>
        <div className="flex flex-col lg:gap-3 lg:flex-row">
          <ControlledInputUI
            control={control}
            name="address"
            label="Dirección"
            inputType="text"
            error={errors.address}
            rightIcon={<MapMarkerIcon width="22px" height="22px" fill={colors.primary.dark} />}
            iconOnClick={() => handleOnShowGoogleMaps()}
          />
        </div>
        <div className="flex justify-center">
          <ButtonUI text="Registrar" type="submit" isLoading={isLoading} />
        </div>
      </FormUI>
      {/* Google Maps Modal */}
      {showGoogleMaps && (
        <GoogleMapsModal
          defaultCenter={defaultCenterMap}
          markerPosition={markerPosition}
          setMarkerPosition={handleMarkerPosition}
          saveGeorefence={saveGeorefence}
        />
      )}
    </>
  )
}
export default RegisterClientScreen
