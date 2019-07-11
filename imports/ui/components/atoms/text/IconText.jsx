import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Icon } from 'antd';

import { ColorTextPrimary } from '../../../styles/variables'

const IconTextContainer = styled.div`
  display: flex;
  margin-right: 20px;
`

const IconWrapper = styled(Icon)`
  margin-right: 10px;
`


export const IconText = ({ icon, text }) => (
  <IconTextContainer>
    <IconWrapper type={icon} twoToneColor={ColorTextPrimary} />
    <p className="font-14-regular">{text}</p>
  </IconTextContainer>
)