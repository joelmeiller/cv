import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const FooterBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 0%;
  background-image: url(${({ picture }) => picture});
  opacity: 0.35;
  filter: blur(4px);
`
