import React from 'react'
import PropTypes from 'prop-types'

import { Timeline } from 'antd'

import { TextParagraph } from '../molecules/TextParagraph'
import { TimelineSection } from '../molecules/TimelineSection'

import { Row } from '../atoms/layout/Row'
import { Column } from '../atoms/layout/Column'
import { Section } from '../molecules/Section'

export const TextSection = ({ columns, title, paragraphs, attachment, timeline }) => (
  <Section title={title}>
    {columns ? (
      paragraphs.map((paragraph, index) => (
        <Column half key={`paragraph-${index}`}>
          <TextParagraph {...paragraph} />
        </Column>
      ))
    ) : (
      <Column twoThird>
        <Row columnMargin>
          {paragraphs.map((paragraph, index) => (
            <Column fullwidth key={`paragraph-${index}`}>
              <TextParagraph {...paragraph} />
            </Column>
          ))}
        </Row>
      </Column>
    )}
    {timeline && (
      <Column third center>
        <TimelineSection timeline={timeline} />
      </Column>
    )}
  </Section>
)
