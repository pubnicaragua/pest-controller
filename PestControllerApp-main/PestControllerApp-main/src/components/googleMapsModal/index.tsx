import { MapMouseEvent, useMarkerRef } from '@vis.gl/react-google-maps'
import { ButtonUI, GoogleMapsUI } from '../../../packages/components'
import { GoogleMapsModalProps } from './types'

const GoogleMapsModal: React.FC<GoogleMapsModalProps> = ({
  defaultCenter,
  markerPosition,
  draggable = true,
  zoom = 13,
  setMarkerPosition,
  saveGeorefence,
}) => {
  const [markerRef] = useMarkerRef()

  const handleOnClickMap = (ev: MapMouseEvent) => {
    if (setMarkerPosition) {
      setMarkerPosition(ev.detail.latLng.lat, ev.detail.latLng.lng)
    }
  }

  const handleOnDragendMarker = (ev: google.maps.MapMouseEvent) => {
    if (setMarkerPosition) {
      setMarkerPosition(ev.latLng.lat(), ev.latLng.lng())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-between items-center max-w-[100vw]">
      <div className="relative p-4 w-full h-full max-w-full max-h-full flex items-end md:items-center">
        <div className="relative bg-white p-4 rounded-lg shadow w-full h-full min-h-fit max-h-[90vh]">
          <div className="flex flex-col items-center w-full h-full">
            <GoogleMapsUI
              markerRef={markerRef}
              zoom={zoom}
              draggable={draggable}
              markerPosition={markerPosition}
              defaultCenter={defaultCenter}
              handleOnClickMap={handleOnClickMap}
              handleOnDragendMarker={handleOnDragendMarker}
            />
            <div className="flex items-end justify-between w-full flex-col lg:flex-row">
              <span className="text-gray font-semibold italic">
                *Haga click en la ubicación donde se encuentra el cliente
              </span>

              <div className="flex w-full justify-center lg:justify-end">
                <ButtonUI text="OK" type="button" onClick={saveGeorefence} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleMapsModal
