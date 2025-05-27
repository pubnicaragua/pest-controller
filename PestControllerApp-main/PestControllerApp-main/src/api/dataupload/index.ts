import axios from 'axios'
import { Response } from '../types'
import { RegisterServiceDataUploadDTO, UploadImageDatauploadDTO } from './type'

export const registerDataupload = async <T>(
  payload: RegisterServiceDataUploadDTO
): Promise<Response<T>> => {
  try {
    const response = await axios.post(`/datauploads`, payload)
    return { status: response.status, data: response.data, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const getDataupload = async <T>(serviceId: string): Promise<Response<T>> => {
  try {
    const response = await axios.get(`/datauploads?serviceId=${serviceId}`)
    return { status: response.status, data: response.data.payload, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}

export const uploadImagesDataupload = async <T>(
  datauploadId: string,
  payload: UploadImageDatauploadDTO
): Promise<Response<T>> => {
  try {
    const response = await axios.put(`/datauploads/upload/images/${datauploadId}`, payload)
    return { status: response.status, message: response.data.message }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}
