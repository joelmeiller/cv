import React, { Component } from 'react'
import { Row, Col, Form, Icon, Input, Button, Modal } from 'antd'

const { TextArea } = Input

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class CommentFormComponent extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    const { form, onSave, commentForm } = this.props
    e.preventDefault()
    form.validateFields((error, values) => {
      if (!error) {
        onSave &&
          onSave({
            ...commentForm.comment,
            ...values,
          })
      }
    })
  }

  componentDidUpdate(prevProps) {
    const { form, commentForm } = this.props
    if (prevProps.commentForm.comment._id !== commentForm.comment._id) {
      form.setFieldsValue({ text: commentForm.comment.text })
    }
  }

  render() {
    const { commentForm, onClose } = this.props
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const comment = commentForm.comment

    // Only show error after a field is touched.
    const textError = isFieldTouched('text') && getFieldError('text')

    return (
      <Modal
        title={!!comment._id ? 'Edit Comment' : 'Add Comment'}
        visible={commentForm.show}
        style={commentForm.modalStyle}
        onCancel={() => setCommentForm({ ...commentForm, show: false })}
        footer={null}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item validateStatus={textError ? 'error' : ''} help={textError || ''}>
            {getFieldDecorator('text', {
              rules: [{ required: true }],
              initialValue: comment.text,
            })(<TextArea autosize={{ minRows: 3, maxRows: 5 }} />)}
          </Form.Item>

          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                {!!comment._id ? 'Save Comment' : 'Add Comment'}
              </Button>

              {!!comment._id && (
                <Button
                  type="secondary"
                  style={{ marginLeft: 20 }}
                  onClick={() => onClose(comment._id)}
                >
                  Close Comment
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export const CommentForm = Form.create({ name: 'comment-form' })(CommentFormComponent)
