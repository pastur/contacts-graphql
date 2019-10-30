import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import ContactList from '../components/ContactList'

export const getContactsQuery = gql`
  query GetContacts {
    contacts {
      id
      name
      email
    }
  }
`

function ContactListPage() {
  const { loading, error, data } = useQuery(getContactsQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return <ContactList contacts={data.contacts} />
}

export default ContactListPage
