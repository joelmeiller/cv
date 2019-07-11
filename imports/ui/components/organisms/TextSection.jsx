import React from 'react'
import PropTypes from 'prop-types'

import { Timeline } from 'antd'

import { TextParagraph } from '../molecules/TextParagraph'
import { TimelineSection } from '../molecules/TimelineSection'

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

export const TextSection = ({ title, paragraphs, attachment, timeline }) => (
  <Section>
    <Title className="font-36-bold">{title}</Title>
    <Row>
      <Column twoThird>
        <Paragraphs>
          {paragraphs.map((paragraph, index) => (
            <TextParagraph key={`paragraph-${index}`} {...paragraph} />
          ))}
        </Paragraphs>
      </Column>
      {timeline && (
        <Column third>
          <TimelineSection timeline={timeline} />
        </Column>
      )}
    </Row>
  </Section>
)
