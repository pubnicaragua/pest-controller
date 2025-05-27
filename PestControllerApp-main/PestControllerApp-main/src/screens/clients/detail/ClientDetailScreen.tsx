import GeneralInfoSection from '@/components/clients/detail/generalInfoSection'
import { ButtonUI, HeaderOverFlowUI, IconButtonUI } from '../../../../packages/components'
import { ClientDetailScreenProps } from '../types'
import ContactInfoSection from '@/components/clients/detail/contactInfoSection'
import UpdateClientModal from '@/components/clients/update'
import { useState } from 'react'
import { EditIcon, TrashIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'
import { useRouter } from 'next/navigation'
import GeolocalizationSection from '@/components/clients/detail/geolocalizationSection'
import { api } from '@/api'
import toast from 'react-hot-toast'
import { useSession } from '@/contexts/session'
import { UserRole } from '@/api/users/type'

const ClientDetailScreen: React.FC<ClientDetailScreenProps> = ({ client, refreshClient }) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  const { session } = useSession()

  const router = useRouter()

  const onChangeVisibleModal = () => setVisibleModal(prevState => !prevState)

  const deleteClient = async (id: string) => {
    const response = await api.clients.removeOnlyClient(id)
    if (response.status === 200) {
      toast.success(response.message)
      router.push('/clients')
    } else {
      toast.error(response.message)
    }
  }

  const redirectToList = () => router.push('/clients')

  return (
    <>
      <div className="flex w-full h-full items-center justify-center px-1 py-3 min-h-fit">
        <div className="flex flex-col justify-between bg-white rounded-lg px-3 pt-2 pb-5 w-full h-fit min-h-full">
          <div>
            <div className="flex items-center justify-between">
              <HeaderOverFlowUI title="Detalle del cliente" />
              <div className="flex gap-3">
                <IconButtonUI
                  icon={<EditIcon width="18" height="18" fill={colors.primary.DEFAULT} />}
                  onClick={() => onChangeVisibleModal()}
                />
                {session.role === UserRole.SUPERADMIN && (
                  <button
                    className="border-2 border-error rounded-lg p-2 md:mr-4"
                    onClick={() => deleteClient(client._id)}
                  >
                    <TrashIcon width="24" height="24" fill={colors.error} />
                  </button>
                )}
              </div>
            </div>
            <GeneralInfoSection client={client} />
            <ContactInfoSection client={client} />
            {client.geolocalization && (
              <GeolocalizationSection geolocalization={client.geolocalization} />
            )}
          </div>
          <div className="flex w-full justify-center lg:justify-start">
            <ButtonUI classname="secondary" text="Volver" onClick={() => redirectToList()} />
          </div>
        </div>
      </div>

      {/* Update client modal */}
      <UpdateClientModal
        visible={visibleModal}
        onClose={onChangeVisibleModal}
        client={client}
        refreshClient={refreshClient}
      />
    </>
  )
}

export default ClientDetailScreen
