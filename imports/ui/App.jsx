import React, { Fragment, useState } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { Modal, message } from 'antd'

import styled from 'styled-components'

import { PageHeader } from './components/templates/PageHeader'
import { PageContent } from './components/templates/PageContent'
import { PageFooter } from './components/templates/PageFooter'
import { PageLoading } from './components/templates/PageLoading'
import { Navigation } from './components/templates/Navigation'

import { LoginForm } from './components/organisms/LoginForm'

import { CommentOverlay } from './containers/CommentOverlay'

import { Contents, Comments } from '/imports/api'

const sortSections = (a, b) => a.sequenceNr - b.sequenceNr

const App = ({ content, comments, user }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showComments, setShowComments] = useState(false)

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
      />
      <CommentOverlay comments={comments} showComments={showComments}>
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
      </CommentOverlay>

      <LoginForm
        show={showLogin && !user}
        onCancel={() => setShowLogin(false)}
        onLogin={values => {
          Meteor.loginWithPassword(values.user, values.password, error => {
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

const AppContainer = withTracker(() => ({
  content: Contents.findOne(),
  comments: Comments.find().fetch(),
  user: Meteor.user(),
}))(App)

export default AppContainer
