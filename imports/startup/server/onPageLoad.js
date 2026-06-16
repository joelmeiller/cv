// Meteor
import { Meteor } from 'meteor/meteor'
import { onPageLoad } from 'meteor/server-render'

// React
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

// Route Page Component
import App from '../../ui/App'

// Collections
import { Contents } from '../../api/collections/Contents'
import { getLatestStyleAsync } from '../../api/utils/getLatestStyle'
import { getStyleFontLink, getStyleVariableCss } from '../../ui/utils/applyStyleVariables'
import { fetchProfilePictureDataUri } from './fetchProfilePictureDataUri'

// Utils
let rangeErrorThrown = false

const getParseLanguage = (queryLang) => {
  if (queryLang === 'en' || queryLang === 'de') {
    return queryLang
  }

  return 'en'
}

onPageLoad(async (sink) => {
  const request = sink.request

  /*
   * Log request
   */

  const userAgent = request.headers['user-agent'] || ''
  const isHealthChecker = userAgent.startsWith('ELB-HealthChecker')

  if (!isHealthChecker) {
    const pageProtocol = request.headers['x-forwarded-proto'] || 'http'

    if (Meteor.isProduction && pageProtocol === 'http') {
      const pageUrl = `https://${request.headers.host}${request.url.pathname}`
      sink.redirect(pageUrl, 301)
    } else {
      console.log()
      console.log('******************')
      console.log('*** 🧨 REQUEST ***')
      console.log('******************')

      let sheet = new ServerStyleSheet()

      try {
        /*
         * Get content data
         */

        const pathname = request.url.pathname
        const isParseCV = pathname === '/cv-parse'
        const language = isParseCV ? getParseLanguage(request.url.query?.lang) : 'en'
        const versionNr = Meteor.settings.public.VERSION

        const contentData = await Contents.findOneAsync(
          { versionNr, language },
          { sort: { versionNr: -1 } }
        )

        const styleData =
          contentData && !isParseCV ? await getLatestStyleAsync(contentData.style) : null

        let profilePictureDataUri = null

        if (isParseCV && contentData?.header?.profilePicture) {
          profilePictureDataUri = await fetchProfilePictureDataUri(contentData.header.profilePicture)
        }

        if (contentData) {
          console.log(`***** LOADED VERSION NR ***** ${contentData.versionNr} *****`)

          if (isParseCV) {
            sink.appendToBody(
              `<script>window.__PARSE_CV_DATA__ = ${JSON.stringify({
                contentData,
                profilePictureDataUri,
              })}</script>`
            )
          } else {
            sink.appendToBody(
              `<script>window.__CONTENT_DATA__ = ${JSON.stringify(contentData)}</script>`
            )
          }
        }

        if (styleData) {
          const fontLink = getStyleFontLink(styleData)
          if (fontLink) {
            sink.appendToHead(fontLink)
          }
          sink.appendToHead(`<style id="page-style-variables">${getStyleVariableCss(styleData)}</style>`)
          sink.appendToBody(
            `<script>window.__STYLE_DATA__ = ${JSON.stringify(styleData)}</script>`
          )
        }

        /*
         * Server side rendering of page
         */

        if (!rangeErrorThrown) {
          const app = (
            <App
              contentData={contentData}
              pathname={pathname}
              profilePictureDataUri={profilePictureDataUri}
              styleData={styleData}
            />
          )

          sink.renderIntoElementById(
            'react-target',
            renderToString(
              isParseCV ? (
                app
              ) : (
                <StyleSheetManager sheet={sheet.instance}>{app}</StyleSheetManager>
              )
            )
          )

          if (!isParseCV) {
            sink.appendToHead(sheet.getStyleTags())
          }
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
  }
  return sink
})
