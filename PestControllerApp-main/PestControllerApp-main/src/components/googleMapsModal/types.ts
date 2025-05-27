export type GoogleMapsModalProps = {
  defaultCenter?: { lat: number; lng: number }
  markerPosition?: { lat: number; lng: number }
  draggable?: boolean
  zoom?: number
  setMarkerPosition?: (lat: number, lng: number) => void
  saveGeorefence?: () => void
}
