import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

const Loader: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <div id="loaderForAPICall" className="loaderHide">
        <div className="cssload-fond">
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </div>
        <div>
          <div className="loader-overlay-nav" />
          <div className="loader-overlay" id="loaderNav" />
        </div>
      </div>
    </>
  )
}

export default Loader
