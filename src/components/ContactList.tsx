import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

export interface Contact {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

const useStyles = makeStyles({
  listItem: {
    '&:hover': {
      background: '#f5f5f5',
    },
  },
})

function ContactList({ contacts }: { contacts: Contact[] }) {
  const classes = useStyles()

  return (
    <Paper>
      <List>
        {contacts.map(({ id, name, email }) => (
          <Link to={`/contact/${id}`} key={id}>
            <ListItem divider className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>{name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={email} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  )
}

export default ContactList
