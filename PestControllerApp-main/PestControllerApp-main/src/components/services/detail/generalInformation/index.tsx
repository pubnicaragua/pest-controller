import { ServiceStatusTranslate, ServiceUrgencyTranlate } from '@/api/services/type'
import { GeneralInformationSectionProps } from '../../types'
import { capitalizeString } from '@/libs/strings'
import dayjs from 'dayjs'
import { LineDividerUI } from '../../../../../packages/components'
import { useSession } from '@/contexts/session'
import { UserRole } from '@/api/users/type'
import { MapMarkerIcon } from '../../../../../packages/icons'
import { colors } from '../../../../../tailwind.config'
import GoogleMapsModal from '@/components/googleMapsModal'
import { useState } from 'react'

const GeneralInformationSection: React.FC<GeneralInformationSectionProps> = ({ service }) => {
  const [showGoogleMaps, setShowGoogleMaps] = useState<boolean>(false)
  const { session } = useSession()

  const startTime = service.startTime ? dayjs(service.startTime).format('HH:mm:ss') : '--'
  const finishTime = service.finishTime ? dayjs(service.finishTime).format('HH:mm:ss') : '--'

  const handleOnShowGoogleMaps = () => {
    setShowGoogleMaps(prevState => !prevState)
  }

  return (
    <div className="mb-5 flex flex-wrap gap-y-4">
      <span className="font-semibold text-lg basis-full">Información general del servicio</span>
      <div className="basis-1/2">
        <span className="font-semibold mr-2">Tipo:</span>
        <span>{capitalizeString(service.serviceType)}</span>
      </div>
      <div className="basis-1/2">
        <span className="font-semibold mr-2">Urgencia:</span>
        <span>{capitalizeString(ServiceUrgencyTranlate[service.urgency])}</span>
      </div>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">Fecha de la visita:</span>
        {service.needVisit ? (
          <span>{dayjs(service.visitDate).format('DD MMMM YYYY')}</span>
        ) : (
          <span>No requiere visita previa</span>
        )}
      </div>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">Fecha de realización del servicio:</span>
        <span>{dayjs(service.serviceDate).format('DD MMMM YYYY')}</span>
      </div>
      <div className={session.role === UserRole.TECHNICAL ? 'basis-full' : 'basis-1/2'}>
        <span className="font-semibold mr-2">Estado:</span>
        <span>{capitalizeString(ServiceStatusTranslate[service.status])}</span>
      </div>
      {session.role !== UserRole.TECHNICAL && (
        <div className="basis-full lg:basis-1/2">
          <span className="font-semibold mr-2">Presupuesto:</span>
          <span>{service.budget ? `$ ${service.budget} CLP` : 'No asignado'}</span>
        </div>
      )}
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">Hora de inicio:</span>
        <span>{startTime}</span>
      </div>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">Hora de finalización:</span>
        <span>{finishTime}</span>
      </div>

      <div className="basis-full">
        <span className="font-semibold mr-2 block">Observaciones</span>
        <span>{capitalizeString(service.observations ?? 'No posee')}</span>
      </div>
      <div className="flex items-center basis-full">
        <div className="flex-1">
          <span className="font-semibold mr-2 block">Dirección</span>
          <span>{capitalizeString(service.address)}</span>
        </div>
        {(service?.geolocation || service.clientId?.geolocalization) && (
          <div>
            <i className="cursor-pointer" onClick={() => handleOnShowGoogleMaps()}>
              <MapMarkerIcon width="30px" height="30px" fill={colors.primary.dark} />
            </i>
          </div>
        )}
      </div>
      <LineDividerUI />

      {/* Google Maps Modal */}
      {showGoogleMaps && (
        <GoogleMapsModal
          defaultCenter={service?.geolocation ?? service.clientId.geolocalization}
          markerPosition={service?.geolocation ?? service.clientId.geolocalization}
          draggable={false}
          zoom={18}
          saveGeorefence={() => handleOnShowGoogleMaps()}
        />
      )}
    </div>
  )
}

export default GeneralInformationSection
