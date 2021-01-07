// React
import React from 'react'
import { hydrate } from 'react-dom'

// Meteor
import { onPageLoad } from 'meteor/server-render'

// Components
import { App } from '../../ui/App'

onPageLoad(() => {
  hydrate(
    <App contentData={window.__CONTENT_DATA__} pathname={window.location.pathname} />,
    document.getElementById('react-target')
  )
})
