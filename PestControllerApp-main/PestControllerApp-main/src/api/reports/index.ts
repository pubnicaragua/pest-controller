import axios from 'axios'
import { Response } from '../types'

export const getReports = async <T>(clientId?: string): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/reports?clientId=${clientId}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const getPestByClientReports = async <T>(
  clientId: string,
  serviceType: string
): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/reports/${clientId}?serviceType=${serviceType}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}
