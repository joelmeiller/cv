import React, { Fragment, useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { Modal, message } from 'antd/lib'

import styled from 'styled-components'

import { PageHeader } from './components/templates/PageHeader'
import { PageContent } from './components/templates/PageContent'
import { PageFooter } from './components/templates/PageFooter'
import { PageLoading } from './components/templates/PageLoading'
import { Navigation } from './components/templates/Navigation'

import { LoginForm } from './components/organisms/LoginForm'

import { CommentOverlay } from './containers/CommentOverlay'

import { Contents } from '/imports/api'

const sortSections = (a, b) => a.sequenceNr - b.sequenceNr

const App = ({ content, user }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showComments, setShowComments] = useState(false)

  if (content) console.log('***** LOADED VERSION NR *****', content.versionNr)

  return !!content ? (
    <Fragment>
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
      {content && (
        <CommentOverlay showComments={showComments} contentId={content._id} />
      )}

      <PageHeader
        backgroundPicture={content.backgroundPicture}
        profilePicture={content.profilePicture}
        profilePictureAccent={content.profilePictureAccent}
        description={content.description}
        name={content.name}
        onShowLogin={() => setShowLogin(true)}
      />
      <PageContent sections={content.sections.sort(sortSections)} />

      <PageFooter backgroundPicture={content.backgroundPicture} footer={content.footer} />

      <LoginForm
        show={showLogin && !user}
        onCancel={() => setShowLogin(false)}
        onLogin={(values) => {
          Meteor.loginWithPassword(values.user, values.password, (error) => {
            if (error) {
              message.error('Login failed')
            } else {
              message.success('Logged in')
              setShowLogin(false)
            }
          })
        }}
      />
    </Fragment>
  ) : (
    <PageLoading />
  )
}

const AppContainer = () => {
  const content = useTracker(
    () => Contents.findOne({ versionNr: { $gte: 4 } }, { sort: { versionNr: -1 } }),
    []
  )

  return <App content={content} user={Meteor.user()} />
}

export default AppContainer
