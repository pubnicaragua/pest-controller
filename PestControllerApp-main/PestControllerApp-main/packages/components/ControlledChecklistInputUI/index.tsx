import { Controller } from 'react-hook-form'
import { ControlledChecklistInputUIProps } from './types'

export const ControlledChecklistInputUI: React.FC<ControlledChecklistInputUIProps> = ({
  width = 'w-10',
  border = 'outlined',
  control,
  name,
  label,
}) => {
  const borderStyle = border === 'underlined' ? 'border-b-2' : 'border-2 rounded-md'

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className="flex gap-2">
          <input
            type="number"
            className={`px-1 text-center border-gray-light ${width} ${borderStyle}`}
            value={value}
            onChange={onChange}
          />
          {label && <span>{label}</span>}
        </div>
      )}
    />
  )
}
