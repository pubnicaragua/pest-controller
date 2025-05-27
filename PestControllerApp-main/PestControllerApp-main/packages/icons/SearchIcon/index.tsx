import { IconProps } from '../types'

export const SearchIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6.25" stroke={fill} stroke-width="1.5"></circle>
      <path d="m12 12 4 4" stroke={fill} stroke-width="1.5" stroke-linecap="round"></path>
    </svg>
  )
}
