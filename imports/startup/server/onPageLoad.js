// Meteor
import { Meteor } from 'meteor/meteor'
import { onPageLoad } from 'meteor/server-render'

// React
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

// Route Page Component
import { App } from '../../ui/App'

// Collections
import { Contents } from '../../api/collections/Contents'

// Utils
let rangeErrorThrown = false

onPageLoad(async (sink) => {
  const request = sink.request

  /*
   * Log request
   */

  const userAgent = request.headers['user-agent'] || ''
  const isHealthChecker = userAgent.startsWith('ELB-HealthChecker')

  if (!isHealthChecker) {
    console.log()
    console.log('******************')
    console.log('*** 🧨 REQUEST ***')
    console.log('******************')

    let sheet = new ServerStyleSheet()

    try {
      /*
       * Get content
       */

      const content = Contents.findOne({ versionNr: { $gte: 4 } }, { sort: { versionNr: -1 } })

      if (content) {
        console.log('***** LOADED VERSION NR *****', content.versionNr)

        sink.appendToBody(`<script>window.__CONTENT_DATA__ = ${JSON.stringify(content)}</script>`)
      }

      /*
       * Server side rendering of page
       */

      if (!rangeErrorThrown) {
        sink.renderIntoElementById(
          'react-target',
          renderToString(
            <StyleSheetManager sheet={sheet.instance}>
              <App content={content} />
            </StyleSheetManager>
          )
        )
        sink.appendToHead(sheet.getStyleTags())
      }
    } catch (exception) {
      if (exception.name === 'RangeError') {
        if (!rangeErrorThrown) {
          console.error(`💥 ${new Date().toISOString()} - NODE BUFFER EXCEPTION:`, exception)
          rangeErrorThrown = true
        }
      } else {
        console.error(`💥 ${new Date().toISOString()} - PAGE EXCEPTION:`, exception)
      }

      throw 'Page error'
    } finally {
      sheet.seal()
      sheet = undefined
    }
  }
  return sink
})
