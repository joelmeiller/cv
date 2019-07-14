import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { TextSection } from '../organisms/TextSection'
import { TagsSection } from '../organisms/TagsSection'
import { RatedListSection } from '../organisms/RatedListSection'
import { ReferenceSection } from '../organisms/ReferenceSection'

// styling
import styled from 'styled-components'

const PageContainer = styled.ul`
  position: relative;
  background-color: var(--color-white);
  padding: var(--size-32) var(--size-64);

  display: flex;
  flex-direction: column;
  align-items: center;

  list-style: none;
`

const Section = styled.li`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const Separator = styled.div`
  position: relative;
  height: 2px;
  margin: var(--size-16) 0;
  width: 100%;
  opacity: 0.8;
  background: linear-gradient(180deg, rgba(255, 255, 255) 50%, rgba(0, 0, 0, 0) 80%),
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 15%,
      rgba(0, 0, 0) 25%,
      rgba(0, 0, 0) 75%,
      rgba(0, 0, 0, 0) 85%
    );
  background-position: bottom;
  background-size: 10px 4px;
  background-repeat: repeat-x;
  @media (max-width: 1050px) {
    margin: var(--size-32) 0;
  }
`

export const PageContent = ({ sections }) => (
  <PageContainer>
    {sections.map((section, index) => {
      let sectionComponent = null
      
      const { type } = section

      switch (section.type) {
        case 'TEXT':
          sectionComponent = <TextSection  {...section} />
          break

        case 'TEXT_COLUMNS':
          sectionComponent = <TextSection columns {...section} />
          break

        case 'TAGS':
          sectionComponent = <TagsSection  {...section} />
          break

        case 'RATED_LIST':
          sectionComponent = <RatedListSection  {...section} />
          break

        case 'REFERENCES':
          sectionComponent = <ReferenceSection  {...section} />
          break

        default:
          // No component
      }
       
      return !!sectionComponent ?
      <Section key={`section-${index}`}>
        {sectionComponent}
        {index < sections.length - 1 && <Separator />}
       </Section> : null
      
    })}

  </PageContainer>
)

PageContent.propTypes = {
  sections: PropTypes.array,
}
