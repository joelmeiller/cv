import React from 'react'
import PropTypes from 'prop-types'

// styling
import styled from 'styled-components'
import { MediaSmall } from '../../styles/variables'

const GradeContainer = styled.div`
  position: relative;
  width: 100%;
`

const Title = styled.h2`
  text-align: center;
  margin: 0.5rem 0;
`

const RatingCircle = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border: 3px solid var(--color-accent);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: var(--size-16) auto;
`
const Rating = styled.p`
  font-size: 40px;
  color: var(--color-accent);
  text-align: center;
  margin: 0;

  @media ${MediaSmall} {
    text-align: left;
  }
`
const RateText = styled.p`
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;
`
const Text = styled.p`
  color: var(--color-text-secondary);
  text-align: center;
`

export const GradeSection = ({ title, rating, description, weightedRate }) => (
  <GradeContainer>
    <Title className="font-20-bold">{title}</Title>

    <RatingCircle>
      <Rating className="font-48-bold">{rating}</Rating>{' '}
    </RatingCircle>

    <RateText className="font-20-regular">
      <span className="font-24-bold">{weightedRate}</span> / 6
    </RateText>

    <Text className="font-12-regular">{description}</Text>
  </GradeContainer>
)

GradeSection.propTypes = {
  rating: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  weightedRate: PropTypes.string,
}
