import React from 'react'
import useForm from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'

import Buttons from '../ui/Buttons'
import Content from '../ui/Content'
import ContactDetails from '../components/ContactDetails'
import DeleteContactButton from '../components/DeleteContactButton'

const stateMachine = Machine({
  initial: 'view',
  states: {
    view: {
      on: { EDIT: 'edit' },
    },
    edit: {
      on: {
        SAVE: 'view',
        CANCEL: 'view',
      },
    },
  },
})

export const getContactQuery = gql`
  query GetContact($id: ID!) {
    contact(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`

export const updateContactQuery = gql`
  mutation UpdateContact($contact: InputContact!) {
    updateContact(contact: $contact) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`

function ContactDetailsPage() {
  let { id } = useParams()
  const [current, send] = useMachine(stateMachine)
  const { loading, error, data } = useQuery(getContactQuery, {
    variables: { id },
  })

  const { handleSubmit, register, errors } = useForm()
  const [
    updateContactMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(updateContactQuery)

  const onSubmit = (data: any) => {
    const contact = {
      ...data,
      id,
    }
    updateContactMutation({ variables: { contact } }).then(() => send('SAVE'))
  }

  if (id === undefined) return <p>Not Found :(</p>
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const { contact } = data
  if (contact === null) return <p>Not Found :(</p>

  return (
    <Content>
      {current.matches('view') ? (
        <>
          <ContactDetails contact={contact} />
          <Buttons>
            <Button onClick={() => send('EDIT')}>
              <EditIcon /> Edit
            </Button>
          </Buttons>
        </>
      ) : current.matches('edit') ? (
        <>
          <h2>Edit contact</h2>
          <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Name"
                name="name"
                defaultValue={contact.name}
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
                defaultValue={contact.email}
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
              <Buttons>
                <DeleteContactButton id={id} />
                <Button onClick={() => send('CANCEL')}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Buttons>
            </form>
          </fieldset>
        </>
      ) : null}
    </Content>
  )
}

export default ContactDetailsPage
