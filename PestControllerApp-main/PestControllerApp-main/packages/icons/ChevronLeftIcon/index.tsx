import { IconProps } from '../types'

export const ChevronLeftIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1042 22.5417L6.5625 13L16.1042 3.4375L13.1667 0.5L0.666666 13L13.1667 25.5L16.1042 22.5417Z"
        fill={fill}
      />
    </svg>
  )
}
