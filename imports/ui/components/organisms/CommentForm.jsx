import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Icon, Input, Button, Modal } from 'antd'

const { TextArea } = Input

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

const CommentFormComponent = ({ onSave, commentForm, onClose, onCancel }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    // To disabled submit button at the beginning.
    form.validateFields()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((error, values) => {
      if (!error && !!onSave) {
        onSave({
          ...commentForm.comment,
          ...values,
        })
      }
    })
  }

  useEffect(() => {
    form.setFieldsValue({ text: commentForm.comment.text })
  }, [commentForm.comment._id])

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form

  const comment = commentForm.comment

  // Only show error after a field is touched.
  const textError = isFieldTouched('text') && getFieldError('text')

  return (
    <Modal
      title={!!comment._id ? 'Edit Comment' : 'Add Comment'}
      visible={commentForm.show}
      style={commentForm.modalStyle}
      onCancel={onCancel}
      footer={null}
    >
      <Form onFinish={handleSubmit} name="comment-form">
        <Form.Item
          validateStatus={textError ? 'error' : ''}
          help={textError || ''}
          rules={[{ required: true }]}
        >
          <TextArea autosize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              {!!comment._id ? 'Save Comment' : 'Add Comment'}
            </Button>

            {!!comment._id && (
              <Button type="secondary" style={{ marginLeft: 20 }} onClick={() => onClose(comment)}>
                Close Comment
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export const CommentForm = CommentFormComponent
