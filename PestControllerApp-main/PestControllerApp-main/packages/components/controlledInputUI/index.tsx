import { Controller } from 'react-hook-form'
import { ControlledInputUIProps } from './types'

export const ControlledInputUI: React.FC<ControlledInputUIProps> = ({
  control,
  name,
  inputType = 'text',
  label,
  error,
  filter,
  rightIcon,
  iconOnClick,
  addon,
  leftAddon,
  disabled = false,
  isMobile = false,
}) => {
  const borderColorInput = error ? 'border-error' : 'border-gray-light'

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: React.Dispatch<React.SetStateAction<unknown>>,
    filter?: (value: string) => string
  ) => {
    const { value } = e.target

    if (onChange) onChange(filter ? filter(value) : value)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col w-full mt-4">
          {!isMobile && <label className="">{label}</label>}
          <div className="flex items-center relative w-full">
            <input
              className={`border-2 rounded-lg py-2 px-2 w-full ${borderColorInput} ${
                leftAddon && 'pl-5'
              }`}
              type={inputType}
              name={name}
              value={value}
              onChange={ev => handleChange(ev, onChange, filter)}
              disabled={disabled}
              placeholder={isMobile ? label : ''}
            />
            {rightIcon && (
              <i className="absolute right-2 cursor-pointer" onClick={iconOnClick}>
                {rightIcon}
              </i>
            )}
            {leftAddon && (
              <div className="absolute left-0 py-1 px-2 rounded-r-lg">
                <span className="text-gray">{leftAddon}</span>
              </div>
            )}
            {addon && (
              <div className="absolute right-0 bg-gray-light py-1 px-2 rounded-r-lg h-full">
                <span className="flex items-center text-gray h-full">{addon}</span>
              </div>
            )}
          </div>
          {error && <span className="text-error text-sm font-semibold">{error.message}</span>}
        </div>
      )}
    />
  )
}
