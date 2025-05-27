import axios from 'axios'
import { NewPassword, RecoverPayload, SignInPayload, TokenPayload } from './types'
import { Response } from '../types'

export const getMe = async <T>(): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/auth/me`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const signIn = async <T>(payload: SignInPayload): Promise<Response<T>> => {
  try {
    const response = await axios.post('/auth/login', payload)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const recover = async <T>({ email }: RecoverPayload): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/auth/recover?email=${email}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const verifyToken = async <T>({ email, token }: TokenPayload): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/auth/token?email=${email}&token=${token}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const newPassword = async <T>(payload: NewPassword): Promise<Response<T>> => {
  try {
    const response = await axios.put('/auth/password', payload)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}
