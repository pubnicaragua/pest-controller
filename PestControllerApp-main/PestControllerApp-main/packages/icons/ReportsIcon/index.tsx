import { IconProps } from '../types'

export const ReportsIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 73 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.888"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M42.5 13.5C46.1667 13.5 49.8333 13.5 53.5 13.5C53.5 27.8333 53.5 42.1667 53.5 56.5C49.8333 56.5 46.1667 56.5 42.5 56.5C42.5 42.1667 42.5 27.8333 42.5 13.5Z"
        fill={fill}
      />
      <path
        opacity="0.868"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M30.5 20.5C34.1667 20.5 37.8333 20.5 41.5 20.5C41.5 32.5 41.5 44.5 41.5 56.5C37.8333 56.5 34.1667 56.5 30.5 56.5C30.5 44.5 30.5 32.5 30.5 20.5Z"
        fill={fill}
      />
      <path
        opacity="0.901"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.5 28.5C22.1667 28.5 25.8333 28.5 29.5 28.5C29.5 37.8333 29.5 47.1667 29.5 56.5C25.8333 56.5 22.1667 56.5 18.5 56.5C18.5 47.1667 18.5 37.8333 18.5 28.5Z"
        fill={fill}
      />
    </svg>
  )
}
