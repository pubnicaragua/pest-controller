import { MapMouseEvent } from '@vis.gl/react-google-maps'

export type GoogleMapsUIProps = {
  width?: string
  height?: string
  defaultCenter?: { lat: number; lng: number }
  markerPosition?: { lat: number; lng: number }
  markerRef
  draggable?: boolean
  zoom?: number
  handleOnClickMap?: (ev: MapMouseEvent) => void
  handleOnDragendMarker?: (ev: google.maps.MapMouseEvent) => void
}
