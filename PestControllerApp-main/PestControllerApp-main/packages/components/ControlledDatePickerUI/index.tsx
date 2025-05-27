import { Controller } from 'react-hook-form'
import DatePickerSelectUI from './DatePicker'
import { DatePickerControlledProps } from './types'

const ControlledDatePickerUI: React.FC<DatePickerControlledProps> = ({
  width,
  name,
  control,
  label,
  date,
  handleOnChange,
  error,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = date, onChange } }) => (
        <div className="flex flex-col w-full mt-4">
          <label className="">{label}</label>
          <DatePickerSelectUI
            width={width}
            label={label}
            date={value}
            handleOnChange={date => {
              if (handleOnChange) handleOnChange(date)
              onChange(date)
            }}
          />
          {error && <span className="text-error text-sm font-semibold">{error.message}</span>}
        </div>
      )}
    />
  )
}

export default ControlledDatePickerUI
