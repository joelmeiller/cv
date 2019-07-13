import { Meteor } from 'meteor/meteor'
import { AccountsReact } from 'meteor/day:accounts-react'

export const configureAuthentication = () => {
  AccountsReact.configure({
    defaultState: 'signUp',
    hideSignUpLink: true,
  })
}
