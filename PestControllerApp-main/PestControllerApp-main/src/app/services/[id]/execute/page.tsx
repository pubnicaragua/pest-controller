'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Service,
  ServiceDevices,
  ServiceProducts,
  ServiceStatus,
  ServiceTypes,
} from '@/api/services/type'
import { api } from '@/api'
import { ResponseDataState } from '@/api/types'
import toast from 'react-hot-toast'
import ExecuteServiceScreen from '@/screens/services/executeServiceScreen'
import { LoadingUI } from '../../../../../packages/components'
import SeeServiceScreen from '@/screens/services/seeServiceScreen'

const ServiceExecutePage: NextPage = () => {
  const { id } = useParams()

  const [service, setService] = useState<ResponseDataState<Service>>({
    data: {} as Service,
    isLoading: true,
  })

  const [products, setProducts] = useState<ResponseDataState<ServiceProducts[]>>({
    data: [],
    isLoading: true,
  })

  const [devices, setDevices] = useState<ResponseDataState<ServiceDevices[]>>({
    data: [],
    isLoading: true,
  })

  const getService = async () => {
    const response = await api.services.getSingleService<Service>(id as string)
    if (response.status === 200) {
      setService({ data: response.data, isLoading: false })
    } else {
      setService({ data: {} as Service, isLoading: false })
      toast.error(response.message)
    }
  }

  const getProducts = async (serviceType: ServiceTypes) => {
    const response = await api.services.getProductsService<ServiceProducts[]>(serviceType)
    if (response.status === 200) {
      setProducts({ data: response.data, isLoading: false })
    } else {
      setProducts({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  const getDevices = async (serviceType: ServiceTypes) => {
    const response = await api.services.getDevicesService<ServiceDevices[]>(serviceType)
    if (response.status === 200) {
      setDevices({ data: response.data, isLoading: false })
    } else {
      setDevices({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  useEffect(() => {
    getService()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (service.data._id) {
      getProducts(service.data.serviceType)
      getDevices(service.data.serviceType)
    }
  }, [service.data._id, service.data.serviceType])

  if (service.isLoading || products.isLoading || devices.isLoading) return <LoadingUI />

  if (service.data.status === ServiceStatus.DONE)
    return (
      <SeeServiceScreen products={products.data} devices={devices.data} service={service.data} />
    )

  return (
    <ExecuteServiceScreen products={products.data} devices={devices.data} service={service.data} />
  )
}

export default ServiceExecutePage
