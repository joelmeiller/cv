import React from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import styled from 'styled-components'

const CommentContainer = styled.div`
  position: absolute;
  left: ${({ position }) => position.left}%;
  top: ${({ position }) => position.top}%;
`

const CommentCircle = styled.button`
  cursor: pointer;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  border: none;
`

const NameText = styled.p`
  cursor: pointer;
  color: var(--color-text-inverse);
  font-size: 18px;
  line-height: 1;
  margin: 0;
  padding: 0;
`

export const CommentCard = ({
  _id,
  color,
  createdAt,
  onSelectComment,
  position,
  readonly,
  sequenceNr,
  text,
  updatedAt,
  user: { initials, name },
}) => (
  <CommentContainer position={position}>
    <Popover title={`${name} - Nr. ${sequenceNr}`} content={text} >
      <CommentCircle color={color} onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        !readonly && onSelectComment(e, { _id, text })
      }} >
        <NameText>{initials}</NameText>
      </CommentCircle>
    </Popover>
  </CommentContainer>
)
