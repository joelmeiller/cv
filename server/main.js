import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Contents, Comments } from '/imports/api'

import { configureAuthentication } from '../imports/startup/configureAuthentication'

import '../imports/api/methods'

Meteor.startup(() => {
  configureAuthentication()

  // Accounts.createUser({
  //   username: 'lynda.demmou',
  //   email: 'lynda.demmou@gmx.ch',
  //   password: '1234',
  //   profile: {
  //     firstName: 'Lynda',
  //     lastName: 'Demmou',
  //     email: 'lynda.demmou@gmx.ch',
  //   },
  // })

})
