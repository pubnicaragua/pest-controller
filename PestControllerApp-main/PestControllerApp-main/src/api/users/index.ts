import axios from 'axios'
import { Response } from '../types'
import { RegisterUserPayload, UpdateUserPayload } from './type'

export const getUsersList = async <T>(value: string = ''): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/users?value=${value}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const registerNewUser = async <T>(payload: RegisterUserPayload): Promise<Response<T>> => {
  try {
    const response = await axios.post(`/users`, payload)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const getTechnicals = async <T>(): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/users/technicals`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const updateUser = async <T>(
  id: string,
  payload: UpdateUserPayload
): Promise<Response<T>> => {
  try {
    const response = await axios.put(`/users/${id}`, payload)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const enableUser = async <T>(id: string): Promise<Response<T>> => {
  try {
    const response = await axios.put(`/users/${id}/enabled`)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const removeOnlyUser = async <T>(_id: string): Promise<Response<T>> => {
  try {
    const response = await axios.delete(`/users/${_id}`)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}
