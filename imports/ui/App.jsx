import React, { Fragment, useState } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { AccountsReactComponent } from 'meteor/day:accounts-react'

import { Modal } from 'antd'

import styled from 'styled-components'

import { PageHeader } from './components/templates/PageHeader'
import { PageContent } from './components/templates/PageContent'
import { PageLoading } from './components/templates/PageLoading'
import { Navigation } from './components/templates/Navigation'

import { CommentOverlay } from './containers/CommentOverlay'

import { Contents, Comments } from '/imports/api'

const sortSections = (a, b) => a.sequenceNr - b.sequenceNr

const LoginDialog = styled.div`
  & .ui.large.header {
    display: none;
  }
  
  & .ui.left.icon.input {
    & input {
      padding: 1em !important;
    }

    & .icon {
      display: none;
    }
  }

  & .ui.button {
    margin-top: 30px;
  }
`

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
      </CommentOverlay>

      <Modal
        title="Login"
        visible={showLogin && !user}
        onCancel={() => setShowLogin(false)}
        footer={null}
      >
        <LoginDialog>
          <AccountsReactComponent state="signIn" />
        </LoginDialog>
      </Modal>
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
