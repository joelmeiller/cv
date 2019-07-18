import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Contents, Comments } from '/imports/api'

import '../imports/api/methods'

import content from './content.json'

Meteor.startup(() => {
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

    const existingContentVersion = Contents.findOne({ versionNr: content.versionNr })

    if (!existingContentVersion) {
      Contents.insert({
        versionTimestamp: new Date(),
        ...content,
      })
    }
  })
})
