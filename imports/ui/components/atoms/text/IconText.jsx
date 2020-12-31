import React from 'react'
import styled from 'styled-components'

import { default as AntIcon } from '@ant-design/icons'

import { ColorTextPrimary } from '../../../styles/variables'

const StyledIconText = styled.div`
  display: flex;
  margin-right: 20px;
`

const IconWrapper = styled(AntIcon)`
  margin-right: 10px;
  color: ${ColorTextPrimary};
`

export const IconText = ({ Icon, text }) => {
  return (
    <StyledIconText>
      <IconWrapper component={Icon} className="font-14-regular"/>
      <p className="font-14-regular">{text}</p>
    </StyledIconText>
  )
}
