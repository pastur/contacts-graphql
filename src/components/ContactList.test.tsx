import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'

import ContactList from './ContactList'

const contacts = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@doe.com',
    createdAt: '2019-10-17T17:44:00.602Z',
    updatedAt: '2019-10-17T20:52:43.258Z',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@doe.com',
    createdAt: '2019-10-17T20:53:52.755Z',
    updatedAt: '2019-10-17T20:53:52.755Z',
  },
]

describe('ContactList', () => {
  it('should render contacts', () => {
    const { container } = render(
      <MemoryRouter>
        <ContactList contacts={contacts} />
      </MemoryRouter>
    )

    expect(container).toHaveTextContent('John Doe')
    expect(container).toHaveTextContent('john@doe.com')
    expect(container).toHaveTextContent('Jane Doe')
    expect(container).toHaveTextContent('jane@doe.com')
  })
})
