import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { getContactsQuery } from '../pages/ContactListPage'
import { Contact } from './ContactList'

export const deleteContactQuery = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`

function DeleteContactButton({ id }: { id: String }) {
  const history = useHistory()
  const [deleteContactMutation, { loading, error }] = useMutation(
    deleteContactQuery
  )
  const deleteContact = () => {
    deleteContactMutation({
      variables: { id },
      update: (store, { data: { deleteContact } }) => {
        if (!deleteContact) return
        const data: any = store.readQuery({ query: getContactsQuery })
        if (data && data.contacts) {
          data.contacts = data.contacts.filter((c: Contact) => c.id !== id)
          store.writeQuery({ query: getContactsQuery, data })
        }
      },
    }).then(() => history.push('/'))
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        data-testid="delete-button"
        color="secondary"
        aria-label="delete"
      >
        <DeleteIcon /> Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete contact?</DialogTitle>
        <DialogContent data-testid="confirm-dialog">
          <DialogContentText id="alert-dialog-description">
            This operation cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button
            onClick={deleteContact}
            color="secondary"
            data-testid="confirm-button"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteContactButton
