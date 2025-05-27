import { InputProps } from './types'

const Input: React.FC<InputProps> = ({
  width = 'w-10',
  placeholder,
  border = 'underlined',
  name,
  inputType = 'text',
  value = '',
  onChange,
  disabled = false,
}) => {
  const borderStyle = border === 'underlined' ? 'border-b-2' : 'border-2 rounded-md'

  return (
    <div className="flex gap-2">
      <input
        type={inputType}
        name={name}
        value={value}
        className={`px-1 text-center border-gray-light ${width} ${borderStyle}`}
        onChange={ev => onChange(ev)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  )
}

export default Input
