// React
import React from 'react'
import PropTypes from 'prop-types'

// Ant
import { Button } from 'antd'

// Atoms
import { ProfilePicture } from '../atoms/images/ProfilePicture'
import { TitleBackground } from '../atoms/images/TitleBackground'

// Styled
import styled from 'styled-components'

// Constatns
import { MediaSmall } from '../../styles/variables'

const PageHeaderContainer = styled.div`
  width: 100%;
  height: var(--size-hero-height);
  position: relative;
  display: flex;
  background-color: var(--color-black);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;

  @media print {
    background-color: transparent;
    box-shadow: none;
  }
`

const PersonContainer = styled.div`
  position: relative;
  width: 100%;
  margin: var(--size-32) auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 9;

  @media print {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
`

const ContactContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;

  bottom: -27px;

  @media ${MediaSmall} {
    bottom: -20px;
  }

  @media print {
    display: none;
  }
`

const StyledProfilePicture = styled(ProfilePicture)`
  height: var(--size-profile-pic);
  width: var(--size-profile-pic);
  margin: var(--size-24);

  @media ${MediaSmall} {
    margin: 0;
  }
`

const PersonInfoContainer = styled.div`
  min-width: var(--size-profile-pic);
  max-width: var(--max-size-title-info);
  margin: var(--size-24);

  @media print {
    margin: 0;
    padding-left: 60px;
  }
`

const Name = styled.h1`
  width: fit-content;
  color: var(--color-text-inverse);
  background-color: var(--color-black-shadow);
  padding: var(--size-16) var(--size-32);
  margin-bottom: var(--size-16);

  @media print {
    color: var(--color-text-primary);
    background-color: transparent;
    padding: var(--size-16);
    margin-bottom: var(--size-32);
  }
`

const Link = styled.p`
  @media screen {
    display: none;
  }

  @media print {
    color: var(--color-text-primary);
    background-color: transparent;
    margin-bottom: var(--size-32);
    padding: var(--size-8) var(--size-16);

    a {
      text-decoration: underline;
    }
  }
`

const Description = styled.h2`
  width: fit-content;
  color: var(--color-text-inverse);
  background-color: var(--color-black-shadow);
  padding: var(--size-8) var(--size-16);
  margin: 0;

  @media print {
    color: var(--color-text-primary);
    background-color: transparent;
  }
`

const ContactButton = styled.a`
  color: var(--color-white);
  background-color: var(--color-accent);
  cursor: pointer;  
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 1px var(--color-black-shadow);
  transition: color 0.2s ease-out, background-color 0.3s ease-out;

  border-radius: 27px;
  height: 54px;
  padding: 0 32px;

  :hover {
    background-color: var(--color-black);
  }

  @media ${MediaSmall} {
    border-radius: 20px;
    height: 40px;
    padding: 0 20px;
  }
`

export const PageHeader = ({ header, isPersonalCV }) => (
  <PageHeaderContainer>
    <TitleBackground picture={header.backgroundPicture} className="no-print" />

    <PersonContainer>
      <StyledProfilePicture
        profilePicturePreview={header.profilePicturePreview}
        profilePicture={header.profilePicture}
        profilePictureAccent={header.profilePictureAccent}
        profilePictureAccentPreview={header.profilePictureAccentPreview}
      />

      <PersonInfoContainer>
        <Name className="font-header-title">{header.name}</Name>
        <Link>
          {isPersonalCV ? (
            <a className="font-header-subtitle" href={header.websitePersonal.linkUrl}>
              {header.websitePersonal.linkText}
            </a>
          ) : (
            <a className="font-header-subtitle" href={header.website.linkUrl}>
              {header.website.linkText}
            </a>
          )}
        </Link>

        {header.description && (
          <Description className="font-header-subtitle">{header.description}</Description>
        )}
      </PersonInfoContainer>
    </PersonContainer>

    <ContactContainer>
      <ContactButton type="primary" href={`mailto:${header.email}`} target="_blank" className="font-24-bold">{header.buttonText}</ContactButton>
    </ContactContainer>
  </PageHeaderContainer>
)
