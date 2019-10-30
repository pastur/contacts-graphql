import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import Toolbar from '@material-ui/core/Toolbar'
import ContactsIcon from '@material-ui/icons/Contacts'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const RouterLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
  <Link ref={ref} {...props} />
))

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid justify="space-between" alignItems="center" container>
            <Grid item>
              <Link to="/">
                <h1 style={{ fontSize: '1.5em' }}>
                  <ContactsIcon style={{ marginRight: '8px' }} />
                  Contacts
                </h1>
              </Link>
            </Grid>

            <Grid item>
              <Fab
                color="secondary"
                variant="extended"
                size="medium"
                aria-label="new contact"
                component={RouterLink}
                to="/add"
              >
                <PersonAddIcon style={{ marginRight: '8px' }} />
                New contact
              </Fab>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '5em' }}>
        <main>{children}</main>
      </Container>
    </>
  )
}

export default Layout
