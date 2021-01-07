import React, { Fragment, Suspense, useState, useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { message } from 'antd'

import styled from 'styled-components'

import { PageHeader } from './components/templates/PageHeader'
import { PageContent } from './components/templates/PageContent'
import { PageFooter } from './components/templates/PageFooter'
import { PageLoading } from './components/templates/PageLoading'
import { Navigation } from './components/templates/Navigation'

import { Contents } from '/imports/api'

// Dynamic imports
//import { LoginForm } from './components/organisms/LoginForm'
const LoginOverlay = React.lazy(() => import('./containers/LoginOverlay'))
//import { CommentOverlay } from './containers/CommentOverlay'
const CommentOverlay = React.lazy(() => import('./containers/CommentOverlay'))

const sortSections = (a, b) => a.sequenceNr - b.sequenceNr

const AppUserContext = ({ contentId, language, onChangeLanugage }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const user = useTracker(() => Meteor.user(), [])

  return (
    <Suspense fallback={<div />}>
      <Navigation
        user={user}
        showComments={showComments}
        language={language}
        onShowComments={() => setShowComments(!showComments)}
        onLogin={() => setShowLogin(true)}
        onLogout={() => {
          setShowLogin(false)
          setShowComments(false)
          Meteor.logout()
          message('You are logged out')
        }}
        onChangeLanugage={onChangeLanugage}
        onPrint={() => window.print()}
      />

      {contentId && showComments && <CommentOverlay show={showComments} contentId={contentId} />}

      {showLogin && !user && <LoginOverlay onClose={() => setShowLogin(false)} />}
    </Suspense>
  )
}

export const App = ({ contentData, pathname }) => {
  const [ssrDone, setSsrDone] = useState(false)
  useEffect(() => {
    setSsrDone(true)
  }, [])

  const [content, setContent] = useState(contentData)

  if (content && ssrDone) console.log('***** LOADED VERSION NR *****', content.versionNr)

  const handleChangeLanguage = (language) => {
    const newContent = Contents.findOne(
      { versionNr: { $gte: 4 }, language },
      { sort: { versionNr: -1 } }
    )
    !!newContent && setContent(newContent)
  }
  
  const isPersonalCV = pathname.endsWith('cv')

  return (
    <Fragment>
      {ssrDone && (
        <AppUserContext
          contentId={content._id}
          language={content.language}
          onChangeLanugage={handleChangeLanguage}
        />
      )}

      <PageHeader header={content.header} />
      <PageContent sections={content.sections.sort(sortSections)} />
      <PageFooter
        backgroundPicture={content.header.backgroundPicture}
        footer={content.footer}
        isPersonalCV={isPersonalCV}
      />
    </Fragment>
  )
}

export default App
