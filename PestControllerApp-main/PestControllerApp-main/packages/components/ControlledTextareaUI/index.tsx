import { Controller } from 'react-hook-form'
import { ControlledTextareaUIProps } from './types'

export const ControlledTextareaUI: React.FC<ControlledTextareaUIProps> = ({
  control,
  name,
  label,
  error,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col w-full">
          <label className="text-lg font-semibold">{label}</label>
          <textarea
            name={name}
            cols={30}
            rows={4}
            value={value}
            className="border border-gray-light rounded-md px-1 py-1 w-full"
            style={{ resize: 'none' }}
            onChange={onChange}
          ></textarea>
          {error && <span className="text-error text-sm font-semibold">{error.message}</span>}
        </div>
      )}
    />
  )
}
