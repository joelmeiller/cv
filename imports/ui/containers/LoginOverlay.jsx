import React from 'react'

import { message } from 'antd'

import { Meteor } from 'meteor/meteor'

import { LoginForm } from '../components/organisms/LoginForm'

export const LoginOverlay = ({ onClose }) => {
  return (
    <LoginForm
      show
      onCancel={onClose}
      onLogin={async (values) => {
        try {
          await Meteor.loginWithPasswordAsync(values.user, values.password)
          message.success('Logged in')
        } catch {
          message.error('Log in failed')
        }
        onClose()
      }}
    />
  )
}

export default LoginOverlay