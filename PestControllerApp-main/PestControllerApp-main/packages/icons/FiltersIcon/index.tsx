import { IconProps } from '../types'

export const FiltersIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.2572 9.65508H14.8731M2.85321 4.84711H17.2771M7.66118 14.463H12.4692"
        stroke={fill}
        stroke-width="1.60266"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
