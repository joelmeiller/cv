// React
import React from 'react'
import { hydrate } from 'react-dom'

// Meteor
import { onPageLoad } from 'meteor/server-render'

// Components
import { App } from '../../ui/App'

onPageLoad(() => {
  const pathname = window.location.pathname
  const isParseCV = pathname === '/cv-parse'
  const parseCvData = window.__PARSE_CV_DATA__

  hydrate(
    <App
      contentData={isParseCV ? parseCvData?.contentData : window.__CONTENT_DATA__}
      pathname={pathname}
      profilePictureDataUri={parseCvData?.profilePictureDataUri}
      styleData={window.__STYLE_DATA__}
    />,
    document.getElementById('react-target')
  )
})
