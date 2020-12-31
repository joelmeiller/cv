import React from 'react'
import styled from 'styled-components'

import { default as AntIcon } from '@ant-design/icons';

import { ColorTextPrimary } from '../../../styles/variables'

const IconTextContainer = styled.div`
  display: flex;
  margin-right: 20px;
`

const IconWrapper = styled(AntIcon)`
  margin-right: 10px;
`


export const IconText = ({ Icon, text }) => (
  <IconTextContainer>
    <IconWrapper component={Icon} twoToneColor={ColorTextPrimary} />
    <p className="font-14-regular">{text}</p>
  </IconTextContainer>
)