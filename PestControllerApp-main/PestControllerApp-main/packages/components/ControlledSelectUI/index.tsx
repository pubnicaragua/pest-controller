import { Controller } from 'react-hook-form'
import { ControlledSelectUIProps } from './types'

export const ControlledSelectUI: React.FC<ControlledSelectUIProps> = ({
  width = 'w-full',
  control,
  name,
  label,
  placeholder,
  options,
  error,
  handleOnClick,
}) => {
  const borderColorInput = error ? 'border-error' : 'border-gray-light'

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className={`flex flex-col mt-4 ${width}`}>
          <label className="">{label}</label>
          <select
            className={`border-2 rounded-lg p-2 ${borderColorInput}`}
            name={name}
            value={value}
            onChange={ev => {
              onChange(ev)
              return handleOnClick && handleOnClick(ev.target.value)
            }}
          >
            <option value="">{placeholder}</option>
            {options?.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {error && <span className="text-error text-sm font-semibold">{error.message}</span>}
        </div>
      )}
    />
  )
}
