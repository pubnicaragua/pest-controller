import { ServiceTypes } from '@/api/services/type'
import { generateCode } from '@/libs/number'

export const getFolderCloudinary = (
  serviceId: string,
  serviceType: ServiceTypes,
  observations?: boolean
): string => {
  const folder =
    serviceType === ServiceTypes.DESRATIZACIÓN
      ? 'desratizacion'
      : serviceType === ServiceTypes.DESINFECCIÓN
      ? 'desinfeccion'
      : serviceType === ServiceTypes.DESINSECTACIÓN
      ? 'desinsectacion'
      : 'personalizado'

  return observations ? `${folder}/${serviceId}/observations` : `${folder}/${serviceId}`
}

export const getImageFormData = async (
  file: File,
  filename: string = '',
  folder: string
): Promise<FormData> => {
  if (!filename) {
    filename = generateCode()
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
  formData.append('public_id', `${folder}/${filename}`)

  return formData
}
