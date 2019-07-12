import React, { useState } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { AccountsReactComponent } from 'meteor/day:accounts-react'

import { Modal } from 'antd'

import { PageHeader } from './components/templates/PageHeader'
import { PageContent } from './components/templates/PageContent'
import { PageLoading } from './components/templates/PageLoading'

import { Contents } from '/imports/api'

const sortSections = (a, b) => a.sequenceNr - b.sequenceNr

const App = ({ content }) => {
  const [showLogin, setShowLogin] = useState(false)

  return !!content ? (
    <div>
      <PageHeader
        backgroundPicture={content.backgroundPicture}
        profilePicture={content.profilePicture}
        profilePictureAccent={content.profilePictureAccent}
        description={content.description}
        name={content.name}
        onShowLogin={() => setShowLogin(true)}
      />
      <PageContent sections={content.sections.sort(sortSections)} />

      <Modal
        title="Login"
        visible={showLogin}
        onCancel={() => setShowLogin(false)}
        footer={null}
      >
        <AccountsReactComponent state="signIn" />
      </Modal>
    </div>
  ) : (
    <PageLoading />
  )
}

const AppContainer = withTracker(() => ({ content: Contents.findOne() }))(App)

export default AppContainer
