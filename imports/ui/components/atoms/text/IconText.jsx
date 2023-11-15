import React from 'react'
import styled from 'styled-components'

const StyledIconText = styled.div`
  display: flex;
  margin-right: 20px;
`

const IconWrapper = styled.p`
  margin-right: 10px;
  color: var(--color-text-primary);
`

export const IconText = ({ Icon, text }) => {
  return (
    <StyledIconText>
      <IconWrapper className="font-14-regular">
        <Icon />
      </IconWrapper>
      <p className="font-14-regular">{text}</p>
    </StyledIconText>
  )
}
