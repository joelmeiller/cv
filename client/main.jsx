import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import App from '/imports/ui/App'

import 'antd/dist/antd.css'
import 'semantic-ui-css/semantic.min.css'

import { configureAuthentication } from '../imports/startup/configureAuthentication'

Meteor.startup(() => {
  configureAuthentication()

  render(<App />, document.getElementById('react-target'))
});
