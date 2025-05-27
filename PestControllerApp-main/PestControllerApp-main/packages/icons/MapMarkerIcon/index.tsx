import { IconProps } from '../types'

export const MapMarkerIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_3_7)">
        <path
          d="M23.073 48.9912C8.88379 28.421 6.25 26.3099 6.25 18.75C6.25 8.39463 14.6446 0 25 0C35.3554 0 43.75 8.39463 43.75 18.75C43.75 26.3099 41.1162 28.421 26.927 48.9912C25.9958 50.3363 24.0041 50.3362 23.073 48.9912ZM25 26.5625C29.3147 26.5625 32.8125 23.0647 32.8125 18.75C32.8125 14.4353 29.3147 10.9375 25 10.9375C20.6853 10.9375 17.1875 14.4353 17.1875 18.75C17.1875 23.0647 20.6853 26.5625 25 26.5625Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_3_7">
          <rect width="50" height="50" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  )
}
