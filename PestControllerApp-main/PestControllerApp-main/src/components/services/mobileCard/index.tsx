import dayjs from 'dayjs'
import { ServiceCardProps } from '../types'
import StatusBadge from '../statusBadge'
import UrgencyBadge from '../urgencyBadge'

const ServiceCard: React.FC<ServiceCardProps> = ({ services, handleToSeeDetail }) => {
  return (
    <>
      {services?.map(service => (
        <div
          key={service._id}
          className="flex flex-col bg-white p-2 rounded-md border border-primary border-solid mb-2"
        >
          <div className="flex justify-between">
            <span className="font-semibold">{service.serviceType}</span>
            <span className="text-gray-dark">
              {dayjs(service.serviceDate).format('DD/MM/YYYY')}
            </span>
          </div>
          <span>{service.clientId?.businessName ?? ''}</span>
          <span>
            Urgencia: <UrgencyBadge urgency={service.urgency} />
          </span>
          <div className="flex">
            <span>{service.address}</span>
          </div>
          <div className="flex w-full justify-between">
            <button
              className="border-[1px] border-primary rounded-lg px-2 py-1 text-primary"
              onClick={() => handleToSeeDetail(service._id)}
            >
              Ver detalle
            </button>
            <StatusBadge status={service.status} />
          </div>
        </div>
      ))}
    </>
  )
}

export default ServiceCard
