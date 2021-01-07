import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { FooterBackground } from '../atoms/images/FooterBackground'
import { Row } from '../atoms/layout/Row'
import { Column } from '../atoms/layout/Column'

import { ContactParagraph } from '../molecules/ContactParagraph'

// styling
import styled from 'styled-components'

const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--color-black);
  padding: 0 var(--size-64);

  @media print {
    margin-top: 0;
    background-color: transparent;
    padding: 0;
  }
`

const Section = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: var(--size-16) 0 var(--size-32);

  @media print {
    padding: var(--size-16) 0;
  }
`

const Title = styled.h1`
  color: var(--color-accent);
  padding-bottom: 4px;
  margin-top: var(--size-8);

  @media print {
    color: var(--color-text-primary);
    font-size: var(--font-size-36);
  }
`

export const PageFooter = ({ backgroundPicture, footer, isPersonalCV }) => {
  const footerParagraphs = isPersonalCV ? footer.paragraphsPersonal : footer.paragraphs
  
  return (
    <FooterContainer>
      <FooterBackground picture={backgroundPicture} className="no-print" />

      <Section>
        <Title className="font-20-bold">{footer.title}</Title>
        <Row>
          {footerParagraphs.map((paragraph, index) => (
            <Column third key={`footer-${index}`}>
              <ContactParagraph {...paragraph} />
            </Column>
          ))}
        </Row>
      </Section>
    </FooterContainer>
  )
}

PageFooter.propTypes = {
  footer: PropTypes.shape({
    title: PropTypes.string,
    paragraphs: PropTypes.array,
  }),
  backgroundPicture: PropTypes.string,
}
