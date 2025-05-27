import { SelectUIProps } from './types'

export const SelectUI: React.FC<SelectUIProps> = ({
  width = 'w-full',
  label,
  name,
  value,
  placeholder,
  onChange,
  options,
}) => {
  return (
    <div className={`flex flex-col mt-4 ${width}`}>
      <label className="">{label}</label>
      <select
        className="border-2 rounded-lg p-2 border-gray-light"
        value={value}
        name={name}
        onChange={ev => onChange(ev)}
      >
        <option value="">{placeholder}</option>
        {options?.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
