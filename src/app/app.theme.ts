import { createTheme } from '@material-ui/core/styles'
import { toast } from 'react-toastify'

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 767,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
})

toast.configure({
  autoClose: 5000,
  draggable: false,
  pauseOnFocusLoss: false,
  position: toast.POSITION.TOP_RIGHT,
})
