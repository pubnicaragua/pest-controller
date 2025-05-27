import { IconProps } from '../types'

export const DotIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4.23097" cy="4.17842" r="2.88478" fill={fill} />
    </svg>
  )
}
