import React from 'react'
import PropTypes from 'prop-types'

import { Row } from '../atoms/layout/Row'
import { SectionTitle } from '../atoms/text/SectionTitle'

// styling
import styled from 'styled-components'

const SectionContainer = styled.div`
  padding-top: var(--size-64);
  padding-bottom: var(--size-64);
`

export const Section = ({ title, children, columnMargin }) => (
  <SectionContainer>
    <SectionTitle title={title} />
    <Row columnMargin={columnMargin}>
      {children}  
    </Row>
  </SectionContainer>
)
