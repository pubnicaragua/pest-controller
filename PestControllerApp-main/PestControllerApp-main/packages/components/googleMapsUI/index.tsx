'use client'

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { GoogleMapsUIProps } from './types'

export const GoogleMapsUI: React.FC<GoogleMapsUIProps> = ({
  width = '100%',
  height = '100%',
  defaultCenter = { lat: -33.442963167944725, lng: -70.66432141346628 },
  markerPosition,
  markerRef,
  draggable = false,
  zoom = 10,
  handleOnClickMap,
  handleOnDragendMarker,
}) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width, height }}
        defaultCenter={defaultCenter}
        defaultZoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onClick={ev => {
          if (handleOnClickMap) handleOnClickMap(ev)
        }}
      >
        {markerPosition && (
          <Marker
            ref={markerRef}
            draggable={draggable}
            position={markerPosition}
            onDragEnd={ev => handleOnDragendMarker(ev)}
          />
        )}
      </Map>
    </APIProvider>
  )
}
