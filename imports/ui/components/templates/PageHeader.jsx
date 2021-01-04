// React
import React from 'react'
import PropTypes from 'prop-types'

// Atoms
import { ProfilePicture } from '../atoms/images/ProfilePicture'
import { TitleBackground } from '../atoms/images/TitleBackground'

// Styled
import styled from 'styled-components'

const PageHeaderContainer = styled.div`
  width: 100%;
  height: var(--size-hero-height);
  position: relative;
  display: flex;
  background-color: var(--color-black);

  @media print {
    background-color: transparent;
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

const StyledProfilePicture = styled(ProfilePicture)`
  height: var(--size-profile-pic);
  width: var(--size-profile-pic);
  margin: var(--size-24);
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

export const PageHeader = ({ name, description, backgroundPicture, profilePicture, profilePictureAccent }) => (
    <PageHeaderContainer>
      
      <TitleBackground picture={backgroundPicture} className="no-print"/>

      <PersonContainer>
        <StyledProfilePicture profilePicture={profilePicture} profilePictureAccent={profilePictureAccent} />

        <PersonInfoContainer>
          <Name className="font-header-title">{name}</Name>
          {description && <Description className="font-header-subtitle">{description}</Description>}
        </PersonInfoContainer>
      </PersonContainer>
    </PageHeaderContainer>
)

PageHeader.propTypes = {
  description: PropTypes.node,
  name: PropTypes.string,
  profilePicture: PropTypes.string,
  profilePictureAccent: PropTypes.string,
}
