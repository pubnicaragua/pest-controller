import { formatRut } from '@/libs/formatRut'
import {
  ButtonUI,
  ControlledInputUI,
  ControlledSelectUI,
  ModalUI,
} from '../../../../packages/components'
import { UpdateClientModalProps } from '../types'
import { useForm } from 'react-hook-form'
import { RegionsAndCommunes } from '@/constants/regionsAndCommunes'
import { useEffect, useState } from 'react'
import { RegisterClientPayload } from '@/api/client/type'
import { api } from '@/api'
import toast from 'react-hot-toast'
import GoogleMapsModal from '@/components/googleMapsModal'
import { getAddressFromLatLng, getLatLngFromAddress, getOnlyLocalAddress } from '@/libs/geocode'
import { MapMarkerIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'

const UpdateClientModal: React.FC<UpdateClientModalProps> = ({
  visible,
  onClose,
  client,
  refreshClient,
}) => {
  const [region, setRegion] = useState<string>('')
  const [commune, setCommune] = useState<string>('')
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>(
    client.geolocalization
  )
  const [showGoogleMaps, setShowGoogleMaps] = useState<boolean>(false)
  const [defaultCenterMap, setDefaultCenterMap] = useState<{ lat: number; lng: number }>(
    client.geolocalization
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    setIsLoading(true)

    const payload: RegisterClientPayload = {
      ...data,
      geolocalization: { lat: markerPosition.lat, lng: markerPosition.lng },
    }

    update(payload)
  }

  const update = async (payload: RegisterClientPayload) => {
    const response = await api.clients.updateClient(client._id, payload)
    if (response.status === 200) {
      toast.success(response.message)
      refreshClient()
      onClose()
    } else {
      toast.error(response.message)
      onClose()
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
    setRegion(client['region'])

    for (const key in client) {
      setValue(key, client[key])
    }
  }, [client, setValue])

  useEffect(() => {
    if (commune) {
      getLatLng()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commune, region])

  return (
    <>
      <ModalUI title="Información del cliente" visible={visible} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row lg:gap-3">
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
          <div className="flex flex-col lg:flex-row lg:gap-3">
            <ControlledInputUI
              control={control}
              name="contact"
              label="Contacto"
              inputType="text"
              error={errors.contact}
            />
            <ControlledInputUI
              control={control}
              name="email"
              label="Correo electrónico"
              inputType="text"
              error={errors.email}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-3">
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
          <div className="flex flex-col lg:flex-row lg:gap-3">
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
            <ButtonUI text="Actualizar" type="submit" isLoading={isLoading} />
          </div>
        </form>
      </ModalUI>
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

export default UpdateClientModal
