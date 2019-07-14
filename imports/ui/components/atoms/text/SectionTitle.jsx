import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Title = styled.h1`
  padding-bottom: 4px;
`

export const SectionTitle = ({ title }) => <Title className="font-section-title">{title}</Title>
