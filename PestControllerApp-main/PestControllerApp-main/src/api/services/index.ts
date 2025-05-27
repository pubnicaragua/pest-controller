import axios from 'axios'
import { Response } from '../types'
import { ProductPayload, ScheduleServicePayload, ServiceTypes } from './type'

export const getServicesList = async <T>(
  value: string = '',
  urgency: string = '',
  status: string = ''
): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/services?value=${value}&urgency=${urgency}&status=${status}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const scheduleService = async <T>(payload: ScheduleServicePayload): Promise<Response<T>> => {
  try {
    const response = await axios.post(`/services`, payload)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const getSingleService = async <T>(id: string): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/services/${id}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const updateService = async <T>(
  id: string,
  payload: ScheduleServicePayload
): Promise<Response<T>> => {
  try {
    const response = await axios.put(`/services/${id}`, payload)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const removeOnlyService = async <T>(_id: string): Promise<Response<T>> => {
  try {
    const response = await axios.delete(`/services/${_id}`)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const startService = async <T>(id: string): Promise<Response<T>> => {
  try {
    const response = await axios.put(`/services/${id}/start`)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

// Service products
export const getProductsService = async <T>(serviceType?: string): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/services-products?type=${serviceType}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const addProductService = async <T>(payload: ProductPayload): Promise<Response<T>> => {
  try {
    const response = await axios.post(`/services-products/products-list`, payload)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const removeProductService = async <T>(
  id: string,
  serviceType: ServiceTypes
): Promise<Response<T>> => {
  try {
    const response = await axios.delete(
      `/services-products/products-list/${id}?serviceType=${serviceType}`
    )
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const updateProductService = async <T>(
  id: string,
  payload: ProductPayload
): Promise<Response<T>> => {
  try {
    const response = await axios.put(`/services-products/products-list/${id}`, payload)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

// Service devices
export const getDevicesService = async <T>(serviceType: string): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/services-devices?type=${serviceType}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}
