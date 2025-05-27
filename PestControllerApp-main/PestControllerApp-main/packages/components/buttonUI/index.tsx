import { LoadingUI } from '../LoadingUI'
import { ButtonUIProps } from './types'

export const ButtonUI: React.FC<ButtonUIProps> = ({
  width = 'auto',
  text,
  type = 'button',
  classname = 'primary',
  onClick,
  isLoading,
  disabled,
  formId,
}) => {
  const styles =
    classname === 'primary'
      ? 'bg-primary text-white py-3 rounded-3xl'
      : 'border-2 border-primary rounded-lg w-fit min-w-44 p-1 text-primary'

  return (
    <button
      className={`${styles} min-w-[276px] mt-6 ${width}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      form={formId}
    >
      {isLoading ? <LoadingUI /> : text}
    </button>
  )
}
