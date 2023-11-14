import React from 'react'
import PropTypes from 'prop-types'

import { Rate } from 'antd'

// styling
import styled from 'styled-components'

const ParagraphContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: var(--size-16);
  padding-bottom: var(--size-16);
`
const Title = styled.h1`
  color: var(--color-text-secondary);
  text-align: center;
  min-height: calc(3 * var(--font-size-20));
`

const RatedList = styled.ul`
  margin-top: var(--size-32);
`

const Rating = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: var(--size-32);
`

const Text = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: var(--size-8);
`

export const RatedListParagraph = ({ title, list }) => (
  <ParagraphContainer>
    <Title className="font-20-regular">{title}</Title>

    <RatedList>
      {list.map(({ category, rating }, index) => (
        <Rating key={`rating-${index}`}>
          <Text className="font-16-bold">{category}</Text>
          <Rate defaultValue={rating} disabled className="icon rating" />
        </Rating>
      ))}
    </RatedList>
  </ParagraphContainer>
)

RatedListParagraph.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    rating: PropTypes.number,
  })),
}
