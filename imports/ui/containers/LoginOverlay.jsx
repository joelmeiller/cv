import React from 'react'

import { message } from 'antd'

import { Meteor } from 'meteor/meteor'

import { LoginForm } from '../components/organisms/LoginForm'

export const LoginOverlay = ({ onClose }) => {
  return (
    <LoginForm
      show
      onCancel={onClose}
      onLogin={(values) => {
        Meteor.loginWithPassword(values.user, values.password, (error) => {
          if (error) {
            message.error('Login failed')
          } else {
            message.success('Logged in')
          }
        })
        onClose()
      }}
    />
  )
}

export default LoginOverlay