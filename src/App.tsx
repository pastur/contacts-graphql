import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './ui/Layout'
import ContactListPage from './pages/ContactListPage'
import ContactDetailsPage from './pages/ContactDetailsPage'
import AddContactPage from './pages/AddContactPage'

const client = new ApolloClient()

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <ContactListPage />
          </Route>
          <Route path="/contact/:id">
            <ContactDetailsPage />
          </Route>
          <Route path="/add">
            <AddContactPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </ApolloProvider>
)

export default App
