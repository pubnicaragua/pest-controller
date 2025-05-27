'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Service } from '@/api/services/type'
import { api } from '@/api'
import { ResponseDataState } from '@/api/types'
import toast from 'react-hot-toast'
import { LoadingUI } from '../../../../packages/components'
import ServiceDetailScreen from '@/screens/services/serviceDetail'
import { useSession } from '@/contexts/session'

const ServiceDetailPage: NextPage = () => {
  const { id } = useParams()
  const { session } = useSession()

  const [service, setService] = useState<ResponseDataState<Service>>({
    data: {} as Service,
    isLoading: true,
  })

  const getService = async () => {
    setService(prevState => ({ ...prevState, isLoading: true }))
    const response = await api.services.getSingleService<Service>(id as string)
    if (response.status === 200) {
      setService({ data: response.data, isLoading: false })
    } else {
      setService({ data: {} as Service, isLoading: false })
      toast.error(response.message)
    }
  }

  useEffect(() => {
    getService()
  }, [])

  if (service.isLoading) return <LoadingUI />

  return (
    <ServiceDetailScreen role={session.role} service={service.data} refreshService={getService} />
  )
}

export default ServiceDetailPage
