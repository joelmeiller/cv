import React from 'react'
import PropTypes from 'prop-types'

import { TagsParagraph } from '../molecules/TagsParagraph'

import { Row } from '../atoms/layout/Row'
import { Column } from '../atoms/layout/Column'
import { Section } from '../molecules/Section'

// styling
import styled from 'styled-components'

const Paragraphs = styled.ul`
  list-style: none;
`

export const TagsSection = ({ title, paragraphs, graph }) => (
  <Section title={title} >
    <Column fullwidth>
      <Paragraphs>
        <Row columnMargin>
          {paragraphs.map((paragraph, index) => (
            <Column fullwidth key={`paragraph-${index}`}>
              <TagsParagraph {...paragraph} />
            </Column>
          ))}
        </Row>
      </Paragraphs>
    </Column>
  </Section>
)
