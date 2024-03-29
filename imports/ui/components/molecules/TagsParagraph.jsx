import React from 'react'
import PropTypes from 'prop-types'

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
  margin-left: -15px;

  @media print {
    margin-left: -12px;
  }
`

const Tag = styled.p`
  margin: 5px 10px;
  padding: 5px;
  border-bottom: 2px solid var(--color-text-secondary);

  @media print {
    border-bottom: 1px solid var(--color-text-secondary);
    margin: 3px 10px;
    padding: 2px;
  }
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
