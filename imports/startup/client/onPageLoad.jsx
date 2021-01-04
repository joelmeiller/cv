// React
import React from 'react'
import { hydrate } from 'react-dom'

// Meteor
import { onPageLoad } from 'meteor/server-render'

// Components
import App from '../../ui/App'

onPageLoad(() => {
  hydrate(<App content={window.__CONTENT_DATA__} />, document.getElementById('react-target'))
})
