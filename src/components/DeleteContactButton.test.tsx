import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/react-testing'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MemoryRouter } from 'react-router-dom'

import wait from 'waait'

import DeleteContactButton from './DeleteContactButton'
import { deleteContactQuery } from './DeleteContactButton'
import { getContactsQuery } from '../pages/ContactListPage'

describe('DeleteContactButton', () => {
  it('should render delete button', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <DeleteContactButton id="1" />
        </MemoryRouter>
      </MockedProvider>
    )
    expect(container).toHaveTextContent('Delete')
  })

  it('should show confirmation modal when delete button is clicked', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <DeleteContactButton id="1" />
        </MemoryRouter>
      </MockedProvider>
    )

    await wait(0)

    expect(queryByTestId('confirm-dialog')).toBeNull()

    fireEvent.click(getByTestId('delete-button'))

    expect(getByTestId('confirm-dialog')).toBeVisible()
  })

  it('should delete the contact when the confirm button is clicked', async () => {
    let deleteMutationCalled = false
    const data = { deleteContact: true }
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
      {
        request: {
          query: deleteContactQuery,
          variables: { id: '1' },
        },
        result: () => {
          deleteMutationCalled = true
          return { data }
        },
      },
    ]

    const cache = new InMemoryCache()
    cache.writeData({
      data: {
        contacts: [],
      },
    })

    await act(async () => {
      const { getByTestId } = render(
        <MockedProvider cache={cache} mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <DeleteContactButton id="1" />
          </MemoryRouter>
        </MockedProvider>
      )
      fireEvent.click(getByTestId('delete-button'))
      await wait(0)
      expect(getByTestId('confirm-dialog')).toBeVisible()
      fireEvent.click(getByTestId('confirm-button'))
      await wait(0)

      expect(deleteMutationCalled).toBeTruthy()
    })
  })
})
