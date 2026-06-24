import React from 'react'
import { BrowserRouter } from 'react-router'
import ProfileSettings from '../../src/components/profileSettings.jsx'
import '../../src/App.css';

describe('<ProfileSettings />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <ProfileSettings cUser={[{username: "testerrr", bio:"testtttt"}]} user={{email: "qwert@qwerty.com"}}/>
      </BrowserRouter>);

    cy.intercept('/')
  })
})