import { AccountsReact } from 'meteor/day:accounts-react'

export const configureAuthentication = () => {
  AccountsReact.configure({ defaultState: 'signUp' })
}