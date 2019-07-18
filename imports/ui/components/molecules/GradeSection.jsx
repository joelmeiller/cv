import React from 'react'
import PropTypes from 'prop-types'

// styling
import styled from 'styled-components'

const GradeContainer = styled.div`
  position: relative;
  width: 100%;
`

const Text = styled.p`
  color: var(--color-text-secondary);
  margin-top: var(--size-16);
  text-align: center;
`

const RateText = styled.p`
  text-align: center;
`

const Rating = styled.span`
  color: var(--color-accent);
  text-align: center;
`
const WeightedRate = styled.span`
  color: var(--color-text-secondary);
  text-align: center;
  margin-left: 8px;
`

export const GradeSection = ({ rating, description, weightedRate }) => (
  <GradeContainer>
    <RateText>
      <Rating className="font-48-bold">{rating}</Rating>    
      <WeightedRate className="font-24-bold">/ {weightedRate}</WeightedRate>
    </RateText>
    <Text className="font-12-regular">{description}</Text>
  </GradeContainer>
)

GradeSection.propTypes = {
  rating: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  weightedRate: PropTypes.string,
}
