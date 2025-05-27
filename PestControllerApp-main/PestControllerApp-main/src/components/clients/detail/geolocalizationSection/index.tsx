import { useMarkerRef } from '@vis.gl/react-google-maps'
import { GoogleMapsUI } from '../../../../../packages/components'

const GeolocalizationSection: React.FC<{ geolocalization: { lat: number; lng: number } }> = ({
  geolocalization,
}) => {
  const [markerRef] = useMarkerRef()

  return (
    <div className="mb-5 flex flex-wrap gap-y-4 w-full h-56 lg:h-full">
      <GoogleMapsUI
        height="256px"
        markerPosition={geolocalization}
        defaultCenter={geolocalization}
        markerRef={markerRef}
        zoom={15}
      />
    </div>
  )
}

export default GeolocalizationSection
