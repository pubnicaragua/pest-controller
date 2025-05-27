'use client'
import dayjs from 'dayjs'
import locale from 'dayjs/locale/es'
import DayjsUtils from '@date-io/dayjs'
import { createTheme, InputAdornment, MuiThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DatePicker } from '@material-ui/pickers'
import { CalendarIcon } from '../../icons'
import { colors } from '../../../tailwind.config'
import { DatePickerSelectUIProps } from './types'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.DEFAULT,
      dark: colors.primary.dark,
      light: colors.primary.light,
    },
    secondary: {
      main: '#ffffff',
    },
  },
})

const DatePickerSelectUI: React.FC<DatePickerSelectUIProps> = ({
  width = 'w-full',
  date = dayjs(),
  handleOnChange,
  minDate,
  maxDate,
  error,
}) => {
  const borderColorInput = error ? 'border-error' : 'border-gray-light'

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils} locale={locale}>
      <MuiThemeProvider theme={theme}>
        <div
          className={`flex flex-col gap-1 mb-2 ${width} border-2 rounded-lg px-2 py-1 ${borderColorInput}`}
        >
          <DatePicker
            size="small"
            variant="dialog"
            format="DD/MM/YYYY"
            minDate={minDate}
            maxDate={maxDate}
            value={date}
            onChange={date => handleOnChange && handleOnChange(date)}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarIcon width="20px" height="20px" fill={colors.primary.DEFAULT} />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>
  )
}

export default DatePickerSelectUI
