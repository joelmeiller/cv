import React from 'react'
import PropTypes from 'prop-types'

import { ReferenceParagraph } from '../molecules/ReferenceParagraph'

import { Column } from '../atoms/layout/Column'
import { Section } from '../molecules/Section'

export const ReferenceSection = ({ title, style, paragraphs }) => (
  <Section title={title}>
    {paragraphs.map((paragraph, index) => (
      <Column third padding key={`paragraph-${paragraph.title}`}>
        <ReferenceParagraph {...paragraph} dark={style === 'dark'} />
      </Column>
    ))}
  </Section>
)
