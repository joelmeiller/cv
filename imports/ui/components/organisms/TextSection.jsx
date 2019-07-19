import React from 'react'
import PropTypes from 'prop-types'

import { TextParagraph } from '../molecules/TextParagraph'
import { TimelineSection } from '../molecules/TimelineSection'
import { GradeSection } from '../molecules/GradeSection'

import { Row } from '../atoms/layout/Row'
import { Column } from '../atoms/layout/Column'
import { Section } from '../molecules/Section'

export const TextSection = ({ columns, title, paragraphs, attachment, grade, timeline }) => (
  <Section title={title} >
    {columns ? (
      paragraphs.map((paragraph, index) => (
        <Column half={columns === 'half'} third={columns === 'third'} key={`paragraph-${index}`}>
          <TextParagraph {...paragraph} />
        </Column>
      ))
    ) : (
      <Column twoThird={!!timeline || !!grade} fullwidth={!timeline && !grade} printHalf={!!timeline} padding>
        {paragraphs.map((paragraph, index) => (
          <Row key={`paragraph-${index}`} marginBottom>
            <Column fullwidth>
              <TextParagraph {...paragraph} />
            </Column>
          </Row>
        ))}
      </Column>
    )}
    {timeline && (
      <Column third center padding printHalf={!!timeline}>
        <TimelineSection timeline={timeline} />
      </Column>
    )}

    {grade && (
      <Column third center padding>
        <GradeSection {...grade} />
      </Column>
    )}
  </Section>
)
