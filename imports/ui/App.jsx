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

const AppUserContext = ({ contentId }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const user = useTracker(() => Meteor.user(), [])

  console.log('USER', user)
  
  return (
    <Suspense fallback={<PageLoading />}>
      <Navigation
        user={user}
        showComments={showComments}
        onShowComments={() => setShowComments(!showComments)}
        onLogin={() => setShowLogin(true)}
        onLogout={() => {
          setShowLogin(false)
          setShowComments(false)
          Meteor.logout()
        }}
        onPrint={() => window.print()}
      />

      {contentId && showComments && <CommentOverlay show={showComments} contentId={contentId} />}

      {showLogin && !user && <LoginOverlay onClose={() => setShowLogin(false)} />}
    </Suspense>
  )
}

const App = ({ content }) => {
  const [ssrDone, setSsrDone] = useState(false)
  useEffect(() => {
    setSsrDone(true)
  }, [])

  if (content) console.log('***** LOADED VERSION NR *****', content.versionNr)

  return (
    <Fragment>
      {ssrDone && <AppUserContext contentId={content._id} />}

      <PageHeader
        backgroundPicture={content.backgroundPicture}
        profilePicture={content.profilePicture}
        profilePictureAccent={content.profilePictureAccent}
        description={content.description}
        name={content.name}
      />
      <PageContent sections={content.sections.sort(sortSections)} />

      <PageFooter backgroundPicture={content.backgroundPicture} footer={content.footer} />
    </Fragment>
  )
}

const AppContainer = ({ content }) => {
  // const content = useTracker(
  //   () => Contents.findOne({ versionNr: { $gte: 4 } }, { sort: { versionNr: -1 } }),
  //   []
  // )

  return !!content ? <App content={content} /> : <PageLoading />
}

export default AppContainer
