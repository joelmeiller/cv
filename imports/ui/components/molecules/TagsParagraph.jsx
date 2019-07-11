import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'antd'

import { IconText } from '../atoms/text/IconText'

// styling
import styled from 'styled-components'

const ParagraphContainer = styled.li`
  position: relative;
  width: 100%;
  padding-top: var(--size-16);
  padding-bottom: var(--size-16);
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--size-16);
`

const Tag = styled.p`
  margin: 5px 10px;
  padding: 5px;
  border-bottom: 2px solid var(--color-text-secondary);
`

export const TagsParagraph = ({ title, tags }) => (
  <ParagraphContainer>
    <h1 className="font-20-bold">{title}</h1>

    <TagList>
      {tags.map(tag => (
        <Tag className="font-16-regular" key={tag}>{tag}</Tag>
      ))}
    </TagList>
  </ParagraphContainer>
)

TagsParagraph.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}
