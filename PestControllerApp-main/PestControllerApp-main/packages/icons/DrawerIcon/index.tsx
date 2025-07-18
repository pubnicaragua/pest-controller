import { IconProps } from '../types'

export const DrawerIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 12.5H43.75V16.6667H6.25V12.5ZM6.25 22.9167H43.75V27.0833H6.25V22.9167ZM6.25 33.3333H43.75V37.5H6.25V33.3333Z"
        fill={fill}
      />
    </svg>
  )
}
