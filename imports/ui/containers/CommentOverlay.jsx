import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

import { message } from 'antd'

import { Meteor } from 'meteor/meteor'

import { CommentStatus } from '/imports/api/collections/Comments'
import { Method } from '/imports/api/methods'

import { CommentCard } from '../components/organisms/CommentCard'
import { CommentForm } from '../components/organisms/CommentForm'

import { ColorHaiti, MediaSmall } from '../styles/variables'

const ContentContainer = styled.div`
  position: relative;
  background-color: var(--color-white);
`

const CommentContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: ${({ active }) => (active ? 'block' : 'none')};
  pointer-events: all;
  z-index: 999;

  @media ${MediaSmall} {
    display: none;
  }
`

const Text = styled.p`
  color: var(--color-text-inverse);
`

const MODAL_WIDTH = 520
const MODAL_HEIGHT = 270

const initialCommentFormState = {
  show: false,
  comment: {
    position: { x: 0, y: 0 },
  },
  modalStyle: {},
}

const getUser = userId => {
  const user = Meteor.users.findOne(userId)

  let initials = ''
  let name = 'Unknown'

  if (user) {
    const firstName = (!!user.profile && user.profile.firstName) || ''
    const lastName = (!!user.profile && user.profile.lastName) || ''

    initials = `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`
    name = (firstName > '' && `${firstName} ${lastName}`) || lastName || 'Unknown'
  }

  return user
    ? {
        initials,
        name,
        color: user.profile.color,
        role: user.profile.role,
      }
    : { initials: '-', name: 'Unkown', role: 'none', color: ColorHaiti }
}

let currentUserId
let currentSequenceNr = 1
const getSequenceNr = userId => {
  if (userId !== currentUserId) {
    currentUserId = userId
    currentSequenceNr = 1
  } else {
    currentSequenceNr += 1
  }

  return currentSequenceNr
}

const filterComment = comment => comment.status === CommentStatus.OPEN
const sortComment = (a, b) => (a.userId < b.userId && -1) || a.createdAt - b.createdAt
let commentUserId
const mapComment = comment => {
  const user = getUser(comment.userId)
  return {
    ...comment,
    sequenceNr: getSequenceNr(comment.userId),
    user,
    color: user.color,
    readonly: comment.userId !== Meteor.userId() && !user.role === 'admin',
  }
}

const getModalStyle = e => {
  const modalX = e.clientX
  const modalY = e.clientY
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  let marginLeft = modalX
  let top = modalY

  if (modalX > windowHeight - MODAL_WIDTH) {
    marginLeft = windowHeight - MODAL_WIDTH - 10
  }

  if (modalY > windowHeight - MODAL_HEIGHT) {
    top = windowHeight - MODAL_HEIGHT - 10
  }

  return { marginLeft, top }
}
const saveComment = values => {
  const method = values._id ? Method.updateComment : Method.addComment

  Meteor.call(method, values, error => {
    if (error) {
      message.error('Comment could no be saved')
    } else {
      message.success('Comment successfully saved')
    }
  })
}
const closeComment = comment => {
  Meteor.call(Method.updateComment, { ...comment, close: true }, error => {
    if (error) {
      message.error('Comment could no be closed')
    } else {
      message.success('Comment successfully closed')
    }
  })
}

export const CommentOverlay = ({ children, showComments, comments }) => {
  const containerRef = React.createRef()
  const [commentForm, setCommentForm] = useState(initialCommentFormState)

  return (
    <Fragment>
      <CommentForm
        onSave={values => {
          saveComment(values)
          setCommentForm(initialCommentFormState)
        }}
        onClose={comment => {
          closeComment(comment)
          setCommentForm(initialCommentFormState)
        }}
        onCancel={() => setCommentForm(initialCommentFormState)}
        commentForm={commentForm}
      />
      <ContentContainer
        ref={containerRef}
        onClick={e => {
          if (showComments) {
            const modalStyle = getModalStyle(e)

            const containerStyle = window.getComputedStyle(containerRef.current)
            const containerWidth = parseInt(containerStyle.width.slice(0, -2))
            const containerHeight = parseInt(containerStyle.height.slice(0, -2))
            
            !commentForm.show &&
              setCommentForm({
                show: true,
                comment: {
                  position: {
                    left: ((e.pageX / containerWidth) * 100).toFixed(2),
                    top: ((e.pageY / containerHeight) * 100).toFixed(2),
                  },
                },
                modalStyle,
              })
          }
        }}
      >
        {children}

        <CommentContainer active={showComments} aria-label="comment-container">
          {comments
            .sort(sortComment)
            .filter(filterComment)
            .map((comment, index) => (
              <CommentCard
                key={`comment-${index}`}
                onSelectComment={(e, comment) => {
                  modalStyle = getModalStyle(e)

                  setCommentForm({ show: true, comment, modalStyle })
                }}
                {...mapComment(comment)}
              />
            ))}
        </CommentContainer>
      </ContentContainer>
    </Fragment>
  )
}
