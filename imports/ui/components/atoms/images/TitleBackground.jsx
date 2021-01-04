import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const TitleBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 75% 50%;
  background-image: url(${({ picture }) => picture});
  opacity: 0.85;
`
