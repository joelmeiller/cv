import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Contents, Comments } from '/imports/api'

import { configureAuthentication } from '../imports/startup/configureAuthentication'

import '../imports/api/methods'

Meteor.startup(() => {
  configureAuthentication()

  const users = Meteor.settings.private.users

  users.forEach(user => {
    const existingUser = Meteor.users.findOne({ 'emails.address': user.email })

    if (!existingUser) {
      const newUserId = Accounts.createUser({
        username: user.username,
        email: user.email,
        password: user.password,
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          color: user.color,
          role: user.role,
        },
      })
    }
  })
})
