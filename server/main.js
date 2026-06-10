import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

// Api
import { Contents, Comments, Styles } from '../imports/api'
import '../imports/api/methods'

// Startup
import { useCDN } from '../imports/startup/server/useCDN'
import '/imports/startup/server/onPageLoad'

// Content
import contentEnV7 from './content.en.v7.json'
import contentDeV7 from './content.de.v7.json'
import contentEnV8Cic from './content.en.v8-cic.json'
import contentDeV8Cic from './content.de.v8-cic.json'
import styles from './styles.json'

const SHOULD_RELOAD = true

const contentsByVersion = {
  v7: { en: contentEnV7, de: contentDeV7 },
  'v8-cic': { en: contentEnV8Cic, de: contentDeV8Cic },
}

Meteor.startup(async () => {
  const versionNr = Meteor.settings.public.CONTENT_VERSION
  const contents = contentsByVersion[versionNr]

  if (!contents) {
    throw new Error(`No content files configured for VERSION "${versionNr}"`)
  }

  // CDN Setup
  useCDN()

  // Load users
  const users = Meteor.settings.private.users

  await Promise.all(
    users.map(async (user) => {
      const existingUser = await Meteor.users.findOneAsync({ 'emails.address': user.email })

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

  // Load styles
  const styleVersion = Meteor.settings.public.STYLE_VERSION
  await Promise.all(
    styles.map(async (style) => {
      const existingStyle = await Styles.findOneAsync({
        type: style.type,
        version: styleVersion,
      })

      if (SHOULD_RELOAD || !existingStyle) {
        await Styles.upsertAsync(
          { _id: existingStyle?._id },
          {
            $set: {
              ...style,
              version: styleVersion,
            },
          }
        )
      }
    })
  )

  // Load content
  await Promise.all(
    Object.entries(contents).map(async ([language, content]) => {
      const existingContentVersion = await Contents.findOneAsync({
        versionNr,
        language,
      })

      if (SHOULD_RELOAD || !existingContentVersion) {
        await Contents.upsertAsync(
          { _id: existingContentVersion?._id },
          {
            $set: {
              versionTimestamp: new Date(),
              versionNr,
              language,
              ...content,
            },
          }
        )
      }
    })
  )
})
