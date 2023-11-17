import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

// Api
import { Contents, Comments } from '../imports/api'
import '../imports/api/methods'

// Startup
import { useCDN } from '../imports/startup/server/useCDN'
import '/imports/startup/server/onPageLoad'

const SHOULD_RELOAD = true

// Initial content
import contentEn from './content.en.json'
import contentDe from './content.de.json'

const contents = [contentEn, contentDe]

Meteor.startup(async () => {
  // CDN Setup
  useCDN()

  // Load users
  const users = Meteor.settings.private.users

  await Promise.all(
    users.map(async (user) => {
      const existingUser = Meteor.users.findOne({ 'emails.address': user.email })

      if (!existingUser) {
        const newUserId = await Accounts.createUserAsync({
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
  )

  // Load content
  await Promise.all(
    contents.map(async (content) => {
      const existingContentVersion = await Contents.findOneAsync({
        versionNr: content.versionNr,
        language: content.language,
      })

      if (SHOULD_RELOAD || !existingContentVersion) {
        await Contents.upsertAsync(
          { _id: existingContentVersion?._id },
          {
            $set: {
              versionTimestamp: new Date(),
              ...content,
            },
          }
        )
      }
    })
  )
})
