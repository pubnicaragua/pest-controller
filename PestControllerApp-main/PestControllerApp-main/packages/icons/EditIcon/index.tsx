import { IconProps } from '../types'

export const EditIcon: React.FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2214 3.27776L14.722 7.77854L4.9492 17.5518L0.936568 17.9948C0.399395 18.0542 -0.0544605 17.5999 0.00530355 17.0627L0.451776 13.0471L10.2214 3.27776ZM17.5056 2.60767L15.3924 0.494393C14.7333 -0.164798 13.6642 -0.164798 13.005 0.494393L11.017 2.48251L15.5176 6.98329L17.5056 4.99517C18.1648 4.33563 18.1648 3.26686 17.5056 2.60767Z"
        fill={fill}
      />
    </svg>
  )
}
