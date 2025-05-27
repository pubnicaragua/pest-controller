import { IconProps } from '../types'

export const MenuIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.8333 12.6042L35.25 21.9792V38.25H31.0833V25.75H18.5833V38.25H14.4167V21.9792L24.8333 12.6042ZM24.8333 7L4 25.75H10.25V42.4167H22.75V29.9167H26.9167V42.4167H39.4167V25.75H45.6667"
        fill={fill}
      />
    </svg>
  )
}
