'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/api'
import { ContainerListUI, LoadingUI, TableUI } from '../../../packages/components'
import { ResponseDataState } from '@/api/types'
import toast from 'react-hot-toast'
import { Client } from '@/api/client/type'
import { getColumns } from '@/screens/clients/table/constants'
import SearchInput from '@/components/searchInput'
import { useDebounce } from '@/libs/useDebounce'
import { useSession } from '@/contexts/session'
import { UserRole } from '@/api/users/type'
import ClientCard from '@/components/clients/mobileCard'

const ClientsPage: NextPage = () => {
  const [clients, setClients] = useState<ResponseDataState<Client[]>>({ data: [], isLoading: true })
  const [searchValue, setSearchValue] = useState<string>('')

  const { session } = useSession()
  const router = useRouter()

  const debounceValue = useDebounce(searchValue)

  const toAddNewUser = () => router.push('/clients/create')

  const clientsList = async (searchValue: string = '') => {
    const response = await api.clients.getClientsList<Client[]>(searchValue)
    if (response.status === 200) {
      setClients({ data: response.data, isLoading: false })
    } else {
      setClients({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  const toClientDetail = async (_id: string) => {
    router.push(`/clients/${_id}`)
  }

  const handleOnSearch = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    clientsList(debounceValue)
  }, [debounceValue])

  if (clients.isLoading) return <LoadingUI />

  return (
    <ContainerListUI
      title="Clientes"
      description="Aquí puede observar todos los clientes"
      addBtnText={session.role !== UserRole.TECHNICAL ? 'Registrar cliente' : null}
      handleOnClick={() => toAddNewUser()}
      searchInput={<SearchInput value={searchValue} onChange={handleOnSearch} />}
      isMobile={session.isMobile}
    >
      {session.isMobile ? (
        <ClientCard clients={clients.data ?? []} handleToClientDetail={toClientDetail} />
      ) : (
        <TableUI columns={getColumns(toClientDetail)} data={clients.data ?? []} />
      )}
    </ContainerListUI>
  )
}

export default ClientsPage
