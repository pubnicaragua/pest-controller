import { IconProps } from '../types'

export const DropDownIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.47145 5.52858C4.2111 5.26823 3.78899 5.26823 3.52864 5.52858C3.26829 5.78892 3.26829 6.21103 3.52864 6.47138L7.52864 10.4714C7.78899 10.7317 8.2111 10.7317 8.47144 10.4714L12.4714 6.47138C12.7318 6.21103 12.7318 5.78892 12.4714 5.52858C12.2111 5.26823 11.789 5.26823 11.5286 5.52858L8.00004 9.05717L4.47145 5.52858Z"
        fill={fill}
        fill-opacity="0.5"
      />
    </svg>
  )
}
