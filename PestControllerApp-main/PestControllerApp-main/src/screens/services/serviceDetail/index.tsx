import ClientInformationSection from '@/components/services/detail/clientInformation'
import GeneralInformationSection from '@/components/services/detail/generalInformation'
import TechnicalInformationSection from '@/components/services/detail/technicalInformation'
import { ServiceDetailScreenProps } from '../types'
import { UserRole } from '@/api/users/type'
import dayjs from 'dayjs'
import { ButtonUI, HeaderOverFlowUI, IconButtonUI } from '../../../../packages/components'
import { useRouter } from 'next/navigation'
import { ServiceStatus } from '@/api/services/type'
import UpdateServiceModal from '@/components/services/update'
import { useState } from 'react'
import { EditIcon, TrashIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'
import { api } from '@/api'
import toast from 'react-hot-toast'
import { useSession } from '@/contexts/session'

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  role,
  service,
  refreshService,
}) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { session } = useSession()

  const router = useRouter()

  const { clientId, technicalId } = service

  const isToday = dayjs().isSame(service.serviceDate, 'day')
  const isAfter = dayjs(dayjs()).isAfter(service.serviceDate, 'day')

  const onChangeVisibleModal = () => setVisibleModal(prevState => !prevState)

  const redirectToExecuteService = () => {
    router.push(`/services/${service._id}/execute`)
  }

  const redirectToList = () => router.push('/services')

  const onStartService = async (id: string) => {
    setIsLoading(true)
    const response = await api.services.startService(id)
    if (response.status === 200) {
      redirectToExecuteService()
      setIsLoading(false)
    } else {
      toast.error(response.message)
      setIsLoading(false)
    }
  }

  const deleteService = async (id: string) => {
    const response = await api.services.removeOnlyService(id)
    if (response.status === 200) {
      toast.success(response.message)
      router.push('/services')
    } else {
      toast.error(response.message)
    }
  }

  return (
    <>
      <div className="flex w-full h-full items-center justify-center px-1 py-3 min-h-fit">
        <div className="flex flex-col justify-between bg-white rounded-lg px-3 pt-2 pb-5 w-full h-full min-h-fit">
          <div>
            <div className="flex items-center justify-between">
              <HeaderOverFlowUI title="Detalle del servicio" />
              <div>
                {role !== UserRole.TECHNICAL && (
                  <>
                    {(service.status === ServiceStatus.PENDING ||
                      service.status === ServiceStatus.OVERDUE) && (
                      <IconButtonUI
                        icon={<EditIcon width="18" height="18" fill={colors.primary.DEFAULT} />}
                        onClick={() => onChangeVisibleModal()}
                      />
                    )}
                  </>
                )}
                {session.role === UserRole.SUPERADMIN && (
                  <button
                    className="border-2 border-error rounded-lg p-2 md:mr-4"
                    onClick={() => deleteService(service._id)}
                  >
                    <TrashIcon width="24" height="24" fill={colors.error} />
                  </button>
                )}
              </div>
            </div>
            <GeneralInformationSection service={service} />
            {clientId && <ClientInformationSection client={clientId} />}
            {technicalId ? (
              <TechnicalInformationSection technical={technicalId} />
            ) : (
              <div>
                <h2>No ha asignado a un técnico para este servicio</h2>
              </div>
            )}
          </div>

          {service.status === ServiceStatus.DONE ? (
            <>
              {session.role !== UserRole.TECHNICAL && (
                <div className="flex w-full justify-center lg:justify-end items-end">
                  <ButtonUI text="Visualizar servicio" onClick={() => redirectToExecuteService()} />
                </div>
              )}
            </>
          ) : (
            <div className="flex w-full justify-center items-end">
              {(isToday || isAfter) && role === UserRole.TECHNICAL && (
                <ButtonUI
                  text="Realizar servicio"
                  onClick={() => onStartService(service._id)}
                  isLoading={isLoading}
                />
              )}
            </div>
          )}
          <div className="flex w-full justify-center lg:justify-start">
            <ButtonUI classname="secondary" text="Volver" onClick={() => redirectToList()} />
          </div>
        </div>
      </div>

      {/* Update service modal */}
      {role !== UserRole.TECHNICAL && (
        <UpdateServiceModal
          visible={visibleModal}
          onClose={onChangeVisibleModal}
          service={service}
          refreshService={refreshService}
        />
      )}
    </>
  )
}

export default ServiceDetailScreen
