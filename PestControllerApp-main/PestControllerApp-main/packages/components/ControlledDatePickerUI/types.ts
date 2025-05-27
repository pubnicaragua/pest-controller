import { Control, ErrorOption, FieldValues, Path } from 'react-hook-form'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import dayjs from 'dayjs'

export type DatePickerSelectUIProps = {
  width?: string
  label?: string
  date: dayjs.Dayjs
  handleOnChange?: (date: MaterialUiPickersDate) => void
  minDate?: dayjs.Dayjs
  maxDate?: dayjs.Dayjs
  error?: ErrorOption
}

export type DatePickerControlledProps<TFieldValues extends FieldValues = FieldValues> =
  DatePickerSelectUIProps & {
    name: Path<TFieldValues>
    control: Control
  }
