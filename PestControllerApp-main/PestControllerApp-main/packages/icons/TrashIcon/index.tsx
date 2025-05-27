import { IconProps } from '../types'

export const TrashIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.75 6.25V8.33333H8.33334V12.5H10.4167V39.5833C10.4167 40.6884 10.8557 41.7482 11.6371 42.5296C12.4185 43.311 13.4783 43.75 14.5833 43.75H35.4167C36.5217 43.75 37.5815 43.311 38.3629 42.5296C39.1443 41.7482 39.5833 40.6884 39.5833 39.5833V12.5H41.6667V8.33333H31.25V6.25H18.75ZM14.5833 12.5H35.4167V39.5833H14.5833V12.5ZM18.75 16.6667V35.4167H22.9167V16.6667H18.75ZM27.0833 16.6667V35.4167H31.25V16.6667H27.0833Z"
        fill={fill}
      />
    </svg>
  )
}
