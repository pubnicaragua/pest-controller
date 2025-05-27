import { IconProps } from '../types'

export const ArrowUpIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.0833 33.6667H14.9167V8.66667L3.45833 20.125L0.5 17.1667L17 0.666672L33.5 17.1667L30.5417 20.125L19.0833 8.66667V33.6667Z"
        fill={fill}
      />
    </svg>
  )
}
