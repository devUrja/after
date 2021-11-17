import React from 'react'
import {
  Modal,
  Fade,
  Backdrop,
  IconButton,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  makeStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { IPostFetchHitsData } from 'app/utility/interface/post-data'

const useStyles = makeStyles((theme) => ({
  modal: {
    maxWidth: '51.5rem',
    maxHeight: '94vh',
    margin: ' 0 auto',
    boxShadow: '0 0 12px 0 rgba(0, 0, 0, 0.12)',
    background: '#ffffff',
    position: 'absolute',
    left: '0',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    borderRadius: '8px',
    border: '0',
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
  details: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
  },
  paper: {
    width: '95%',
  },
}))

interface IDialogProps {
  open: boolean
  close: () => void
  data?: IPostFetchHitsData
}

const DialogBox: React.FC<IDialogProps> = ({
  open,
  close,
  data,
}: IDialogProps) => {
  const classes = useStyles()
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => close()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Grid className={classes.modal} container direction="row">
          <Grid className={classes.close} item xs={12}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={close}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.details} item xs={12}>
            {data && (
              <TableContainer className={classes.paper} component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="left">{data.title}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Author</TableCell>
                      <TableCell align="left">{data.author}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Created</TableCell>
                      <TableCell align="left">{data.created_at}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  )
}

export default DialogBox
