import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Input, Button, Modal } from 'antd'

const { TextArea } = Input

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

const CommentFormComponent = ({ onSave, comment, onClose }) => {
  const [form] = Form.useForm()

  const handleSave = (values) => {
    onSave(values)
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue({ text: comment.text })
  }, [comment._id])

  return (
    <Form onFinish={handleSave} name="comment-form" form={form}>
      <Form.Item
        name="text"
        rules={[{ required: true, message: 'Please, add a valid comment', }]}
      >
        <TextArea autosize={{ minRows: 3, maxRows: 5 }} />
      </Form.Item>

      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" >
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
