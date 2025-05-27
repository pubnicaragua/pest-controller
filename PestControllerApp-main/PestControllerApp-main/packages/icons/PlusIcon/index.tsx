import { IconProps } from '../types'

export const PlusIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2276 4.04578V15.2644M4.61829 9.65508H15.8369"
        stroke={fill}
        stroke-width="1.60586"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
