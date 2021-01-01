import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Icon, Input, Button, Modal } from 'antd/lib'

const { TextArea } = Input

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

const CommentFormComponent = ({ onSave, comment, onClose }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    // To disabled submit button at the beginning.
    form.validateFields()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((error, values) => {
      if (!error) onSave(values)
    })
  }

  useEffect(() => {
    form.setFieldsValue({ text: comment.text })
  }, [comment._id])

  const { getFieldsError, getFieldError, isFieldTouched } = form

  // Only show error after a field is touched.
  const textError = isFieldTouched('text') && getFieldError('text')

  return (
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
            <Button type="secondary" style={{ marginLeft: 20 }} onClick={onClose}>
              Close Comment
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  )
}

export const CommentForm = ({ commentForm, onCancel, onSave, onClose }) => {
  const comment = commentForm.comment

  const handleSave = (values) =>
    onSave({
      ...comment,
      ...values,
    })

  const handleClose = () => onClose(comment)

  return (
    <Modal
      title={!!comment._id ? 'Edit Comment' : 'Add Comment'}
      visible={commentForm.show}
      style={commentForm.modalStyle}
      onCancel={onCancel}
      footer={null}
    >
      <CommentFormComponent comment={comment} onClose={handleClose} onSave={handleSave} />
    </Modal>
  )
}
