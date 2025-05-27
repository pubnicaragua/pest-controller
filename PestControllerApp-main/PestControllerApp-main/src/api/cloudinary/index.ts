export const uploadImg = async (formData: FormData) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (response.status === 200) {
      const data = await response.json()
      return { public_id: data.public_id, url: data.url }
    } else {
      return { status: response.status, message: `Error al subir la imagen: ${response}` }
    }
  } catch (err) {
    return { status: err.response.status, message: err.response.data.message }
  }
}
