import React from 'react'
import PropTypes from 'prop-types'

import { ReferenceParagraph } from '../molecules/ReferenceParagraph'

import { Row } from '../atoms/layout/Row'
import { Column } from '../atoms/layout/Column'

// styling
import styled from 'styled-components'

const Section = styled.div`
  padding-top: var(--size-64);
  padding-bottom: var(--size-64);
`

const Title = styled.h1`
  padding-bottom: 4px;
`

const Paragraphs = styled.ul`
  list-style: none;
`

export const ReferenceSection = ({ title, paragraphs }) => (
  <Section>
    <Title className="font-36-bold">{title}</Title>
    <Row>
      {paragraphs.map((paragraph, index) => (
        <Column third padding key={`paragraph-${paragraph.title}`}>
          <ReferenceParagraph {...paragraph} />
        </Column>
      ))}
    </Row>
  </Section>  
)
