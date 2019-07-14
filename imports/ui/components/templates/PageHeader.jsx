// React
import React from 'react'
import PropTypes from 'prop-types'

// Ant
import { Typography } from 'antd'

// Atoms
import { ProfilePicture } from '../atoms/images/ProfilePicture'
import { TitleBackground } from '../atoms/images/TitleBackground'

// Styled
import styled from 'styled-components'

const { Title } = Typography

const HeaderContainer = styled.div`
  width: inherit;
  height: var(--size-hero-height);
  position: relative;
  display: flex;
  background-color: var(--color-black);
`

const PersonContainer = styled.div`
  position: relative;
  width: 100%;
  margin: auto var(--size-32);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 9;
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
`
const Name = styled.h1`
  width: fit-content;
  color: var(--color-text-inverse);
  background-color: var(--color-black-shadow);
  padding: var(--size-16) var(--size-32);
  margin-bottom: var(--size-16);
`

const Description = styled.h2`
  width: fit-content;
  color: var(--color-text-inverse);
  background-color: var(--color-black-shadow);
  padding: var(--size-8) var(--size-16);
  margin: 0;
`

export const PageHeader = ({ onShowLogin, name, description, backgroundPicture, profilePicture, profilePictureAccent }) => (
    <HeaderContainer>
      <TitleBackground picture={backgroundPicture} />
      <PersonContainer>
        <StyledProfilePicture profilePicture={profilePicture} profilePictureAccent={profilePictureAccent} onClick={onShowLogin} />

        <PersonInfoContainer>
          <Name className="font-header-title">{name}</Name>
          {description && <Description className="font-header-subtitle">{description}</Description>}
        </PersonInfoContainer>
      </PersonContainer>
    </HeaderContainer>
)

PageHeader.propTypes = {
  description: PropTypes.node,
  name: PropTypes.string,
  profilePicture: PropTypes.string,
  profilePictureAccent: PropTypes.string,
}
