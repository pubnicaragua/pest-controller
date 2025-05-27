'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/api'
import { ResponseDataState } from '@/api/types'
import toast from 'react-hot-toast'
import { LoadingUI } from '../../../../packages/components'
import { Client } from '@/api/client/type'
import ClientDetailScreen from '@/screens/clients/detail/ClientDetailScreen'

const ServiceDetailPage: NextPage = () => {
  const { id } = useParams()

  const [client, setClient] = useState<ResponseDataState<Client>>({
    data: {} as Client,
    isLoading: true,
  })

  const getClient = async () => {
    setClient(prevState => ({ ...prevState, isLoading: true }))

    const response = await api.clients.getSingleClient<Client>(id as string)
    if (response.status === 200) {
      setClient({ data: response.data, isLoading: false })
    } else {
      setClient({ data: {} as Client, isLoading: false })
      toast.error(response.message)
    }
  }

  useEffect(() => {
    getClient()
  }, [])

  if (client.isLoading) return <LoadingUI />

  return <ClientDetailScreen client={client.data} refreshClient={getClient} />
}

export default ServiceDetailPage
