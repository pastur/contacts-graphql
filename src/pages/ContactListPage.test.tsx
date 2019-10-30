import React from 'react'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/react-testing'
import { MemoryRouter } from 'react-router-dom'

import wait from 'waait'

import ContactListPage from './ContactListPage'
import { getContactsQuery } from './ContactListPage'

const mocks = [
  {
    request: {
      query: getContactsQuery,
    },
    result: {
      data: {
        contacts: [
          { id: '1', name: 'John Doe', email: 'john@doe.com' },
          { id: '2', name: 'Jane Doe', email: 'jane@doe.com' },
        ],
      },
    },
  },
]

describe('ContactListPage', () => {
  it('should render loading state', () => {
    const { container } = render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ContactListPage />
        </MockedProvider>
      </MemoryRouter>
    )
    expect(container).toHaveTextContent('Loading...')
  })

  it('should render contacts', async () => {
    let container: any
    await act(async () => {
      ;({ container } = render(
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ContactListPage />
          </MockedProvider>
        </MemoryRouter>
      ))
    })

    await wait(0)

    expect(container).toHaveTextContent('John Doe')
    expect(container).toHaveTextContent('john@doe.com')
    expect(container).toHaveTextContent('Jane Doe')
    expect(container).toHaveTextContent('jane@doe.com')
  })

  it('should render error', async () => {
    const errorMocks = [
      {
        request: {
          query: getContactsQuery,
        },
        error: new Error('Error message'),
      },
    ]

    let container: any
    await act(async () => {
      ;({ container } = render(
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <MemoryRouter>
            <ContactListPage />
          </MemoryRouter>
        </MockedProvider>
      ))
    })

    await wait(0)

    expect(container).toHaveTextContent('Error :(')
  })
})
