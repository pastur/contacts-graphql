import React, { FunctionComponent } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}))

const Content: FunctionComponent = ({ children }) => {
  const classes = useStyles()

  return <Paper className={classes.root}>{children}</Paper>
}

export default Content
