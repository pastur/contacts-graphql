import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import MailIcon from '@material-ui/icons/MailOutline'
import { format } from 'date-fns'

import { Contact } from './ContactList'

export const formatDate = (iso: string) =>
  format(new Date(iso), 'dd/MM/yyyy hh:mm')

function ContactDetails({ contact }: { contact: Contact }) {
  return (
    <>
      <h2>Contact details</h2>
      <dl>
        <dt>
          <PersonIcon />
        </dt>
        <dd>{contact.name}</dd>
        <dt>
          <MailIcon />
        </dt>
        <dd>{contact.email}</dd>

        {contact.createdAt && (
          <>
            <dt>Created</dt>
            <dd>{formatDate(contact.createdAt)}</dd>
          </>
        )}
        {contact.updatedAt && (
          <>
            <dt>Modified</dt>
            <dd>{formatDate(contact.updatedAt)}</dd>
          </>
        )}
      </dl>
    </>
  )
}

export default ContactDetails
