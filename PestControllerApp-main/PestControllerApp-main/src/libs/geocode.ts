import { fromAddress, geocode, OutputFormat, RequestType, setDefaults } from 'react-geocode'

const configGeocode = () => {
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    language: 'es',
    region: 'ch',
    outputFormat: OutputFormat.JSON,
  })
}

export const getLatLngFromAddress = async (
  address: string
): Promise<{ lat: number; lng: number } | null> => {
  try {
    configGeocode()

    const { results } = await fromAddress(address)
    const { lat, lng } = results[0].geometry.location

    return { lat, lng }
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getAddressFromLatLng = async ({ lat, lng }): Promise<string | null> => {
  try {
    configGeocode()

    const response = await geocode(RequestType.LATLNG, `${lat}, ${lng}`, {
      location_type: 'ROOFTOP',
      enable_address_descriptor: true,
      outputFormat: OutputFormat.JSON,
    })
    const address = response.results[0].formatted_address
    return address
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getOnlyLocalAddress = (value: string) => {
  const arr = value.split(',')
  const address = arr[0]
  const comunne = arr[1]
  const region = arr[2]

  const final = `${address},${comunne},${region}`
  return final
}
