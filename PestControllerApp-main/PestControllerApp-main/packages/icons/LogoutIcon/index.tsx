import { IconProps } from '../types'

export const LogoutIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.3333 11.6667L25.9833 14.0167L30.2833 18.3333H13.3333V21.6667H30.2833L25.9833 25.9667L28.3333 28.3333L36.6666 20L28.3333 11.6667ZM6.66659 8.33333H19.9999V5H6.66659C4.83325 5 3.33325 6.5 3.33325 8.33333V31.6667C3.33325 33.5 4.83325 35 6.66659 35H19.9999V31.6667H6.66659V8.33333Z"
        fill={fill}
      />
    </svg>
  )
}
