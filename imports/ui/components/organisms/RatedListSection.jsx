import React from 'react'
import PropTypes from 'prop-types'

import { RatedListParagraph } from '../molecules/RatedListParagraph'

import { Column } from '../atoms/layout/Column'
import { Section } from '../molecules/Section'

export const RatedListSection = ({ title, paragraphs, graph, pageBreak }) => (
  <Section title={title} >
    {paragraphs.map((paragraph, index) => (
      <Column half key={`paragraph-${index}`}>
        <RatedListParagraph {...paragraph} />
      </Column>
    ))}
  </Section>
)
