import React, { FunctionComponent } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
}))

const Buttons: FunctionComponent = ({ children }) => {
  const classes = useStyles()

  return <Box className={classes.root}>{children}</Box>
}

export default Buttons
