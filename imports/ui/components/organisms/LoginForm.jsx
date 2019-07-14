import React, { Component } from 'react'
import { Form, Icon, Input, Button, Modal } from 'antd'

import { Meteor } from 'meteor/meteor'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class LoginFormComponent extends Component {
  
  handleSubmit = e => {
    const { form, onLogin } = this.props
    e.preventDefault()
    form.validateFields((error, values) => {
      if (!error) {
        onLogin(values)
      }
    })
  }

  render() {
    const { show, onCancel } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Modal
        title={'Login'}
        visible={show}
        onCancel={onCancel}
        footer={null}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('user', {
              rules: [{ required: true, message: 'Please enter your email or username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please enter a password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export const LoginForm = Form.create({ name: 'login-form' })(LoginFormComponent)
