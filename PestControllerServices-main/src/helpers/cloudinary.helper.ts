import { cloudinary } from '../config/cloudinary'
import { generateCode } from '../lib/number'

export const uploadImage = async (
  fileurl: string,
  filename?: string | null,
  folder: string = 'pest-controller'
): Promise<{ publicId: string; url: string }> => {
  try {
    const uploaded = await cloudinary.uploader.upload(fileurl, {
      public_id: filename || generateCode(),
      resource_type: 'image',
      folder,
    })

    return { publicId: uploaded.public_id, url: uploaded.secure_url }
  } catch (err) {
    console.log('cloudinary', err)
    throw new Error('Coludinary Error')
  }
}
