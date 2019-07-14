import React from 'react'
import PropTypes from 'prop-types'

import { ContactParagraph } from '../molecules/ContactParagraph'

import { Column } from '../atoms/layout/Column'
import { Section } from '../molecules/Section'

export const ContactsSection = ({ title, paragraphs }) => (
  <Section title={title}>
    {paragraphs.map((paragraph, index) => (
      <Column third padding key={`paragraph-${paragraph.type}`}>
        <ContactParagraph {...paragraph} />
      </Column>
    ))}
  </Section>
)
