import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() => ({
  textField: {
    marginLeft: '2%',
    marginRight: '2%',
    width: 300,
    background: '#ffffff',
    borderRadius: '5px',
  },
}))

interface IDatePickerProps {
  handleChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DatePicker: React.FC<IDatePickerProps> = ({
  handleChangeDate,
}: IDatePickerProps) => {
  const classes = useStyles()

  return (
    <TextField
      id="date"
      label="Created At"
      type="date"
      defaultValue=""
      variant="outlined"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeDate(e)}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default DatePicker
