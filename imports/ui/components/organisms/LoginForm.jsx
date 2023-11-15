import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import UserOutlined from '@ant-design/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'

import { Meteor } from 'meteor/meteor'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

const LoginFormComponent = ({ onSubmit }) => {
  return (
    <Form onFinish={onSubmit} name="login-form">
      <Form.Item name="user" rules={[{ required: true, message: 'Please enter your email or username!' }]}>
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: 'Please enter a password!' }]}>
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export const LoginForm = ({ show, onLogin, onCancel }) => {
  return (
    <Modal title={'Login'} visible={show} onCancel={onCancel} footer={null}>
      <LoginFormComponent onSubmit={onLogin} />
    </Modal>
  )
}
