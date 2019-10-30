import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ContactDetails from './ContactDetails'

const contact = {
  id: '1',
  name: 'John Doe',
  email: 'john@doe.com',
  createdAt: '2019-10-17T17:44:00.602Z',
  updatedAt: '2019-10-17T20:52:43.258Z',
}

describe('ContactDetails', () => {
  it('should render a contact', () => {
    const { container } = render(<ContactDetails contact={contact} />)

    expect(container).toHaveTextContent('John Doe')
    expect(container).toHaveTextContent('john@doe.com')

    expect(container).toHaveTextContent('17/10/2019')
  })
})
