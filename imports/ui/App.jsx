import React, { Fragment, useState } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { AccountsReactComponent } from 'meteor/day:accounts-react'

import { Modal } from 'antd'

import { PageHeader } from './components/templates/PageHeader'
import { PageContent } from './components/templates/PageContent'
import { PageLoading } from './components/templates/PageLoading'
import { Navigation } from './components/templates/Navigation'

import { CommentOverlay } from './containers/CommentOverlay'

import { Contents, Comments } from '/imports/api'

const sortSections = (a, b) => a.sequenceNr - b.sequenceNr

const App = ({ content, comments, user }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showComments, setShowComments] = useState(true)

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
        <AccountsReactComponent state="signIn" />
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
