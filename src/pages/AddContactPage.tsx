import React from 'react'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { getContactsQuery } from './ContactListPage'
import Buttons from '../ui/Buttons'
import Content from '../ui/Content'

export interface ContactForm {
  name: string
  email: string
}

const AddContactQuery = gql`
  mutation AddContact($contact: InputContact!) {
    addContact(contact: $contact) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`

function AddContactPage() {
  const history = useHistory()
  const [addContactMutation, { loading, error: mutationError }] = useMutation(
    AddContactQuery
  )
  const { handleSubmit, register, errors } = useForm()

  const onSubmit = (contact: any) => {
    addContactMutation({
      variables: { contact },
      update: (store, { data: { addContact } }) => {
        const data: any = store.readQuery({ query: getContactsQuery })
        if (data) {
          data.contacts.push(addContact)
          store.writeQuery({ query: getContactsQuery, data })
        }
      },
    }).then(() => history.push('/'))
  }

  return (
    <Content>
      <h2>Create new contact</h2>

      <fieldset disabled={loading} aria-busy={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            name="name"
            margin="normal"
            variant="outlined"
            inputRef={register({
              required: 'Required',
            })}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            inputRef={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          {mutationError && <p>Error :( Please try again</p>}
          <Buttons>
            <Button onClick={() => history.push('/')}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Add contact
            </Button>
          </Buttons>
        </form>
      </fieldset>
    </Content>
  )
}

export default AddContactPage
