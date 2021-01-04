import React from 'react'
import { hydrate } from 'react-dom'

import { onPageLoad } from 'meteor/server-render'

import App from '../App'

onPageLoad(() => {
  hydrate(<App content={window.__CONTENT_DATA__} />, document.getElementById('react-target'))
})
