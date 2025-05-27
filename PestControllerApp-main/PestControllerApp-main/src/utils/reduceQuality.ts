export const reduceImageQuality = async (file: File, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // Redimensionar la imagen si es necesario
        const MAX_WIDTH = 800
        const MAX_HEIGHT = 800
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height

        // Dibujar la imagen en el canvas con la nueva calidad
        ctx.drawImage(img, 0, 0, width, height)

        // Convertir la imagen a formato Blob con la calidad reducida
        canvas.toBlob(
          blob => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Canvas to Blob conversion failed'))
            }
          },
          'image/png',
          quality
        )
      }
      // Asegurarse de que el resultado es un string
      if (typeof event.target.result === 'string') {
        img.src = event.target.result
      } else {
        reject(new Error('FileReader result is not a string'))
      }
    }

    reader.onerror = error => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
