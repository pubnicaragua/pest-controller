import axios from 'axios'
import { Response } from '../types'
import { RegisterClientPayload } from './type'

export const getClientsList = async <T>(value: string = ''): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/clients?value=${value}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const registerNewClient = async <T>(
  payload: RegisterClientPayload
): Promise<Response<T>> => {
  try {
    const response = await axios.post(`/clients`, payload)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const getSingleClient = async <T>(_id: string): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/clients/${_id}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const updateClient = async <T>(
  id: string,
  payload: RegisterClientPayload
): Promise<Response<T>> => {
  try {
    const response = await axios.put(`/clients/${id}`, payload)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const removeOnlyClient = async <T>(_id: string): Promise<Response<T>> => {
  try {
    const response = await axios.delete(`/clients/${_id}`)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}
