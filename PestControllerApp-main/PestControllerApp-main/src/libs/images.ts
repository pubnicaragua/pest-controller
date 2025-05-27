export const convertFileToBase64 = (file: Blob, callback: (base64: string) => void) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    callback(reader.result as string)
  }
}

export const getTransfromedImageUrl = (url: string) => {
  if (url.includes('.webp')) {
    return url.replace('.webp', '.png')
  } else if (url.includes('.jpg')) {
    return url.replace('.jpg', '.png')
  } else if (url.includes('.jpeg')) {
    return url.replace('.jpeg', '.png')
  }

  return url
}
