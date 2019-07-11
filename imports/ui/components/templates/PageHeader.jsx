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
  margin: var(--size-32);
`

const PersonInfoContainer = styled.div`
  min-width: var(--size-profile-pic);
  max-width: var(--max-size-title-info);
  margin: var(--size-32);
`
const Name = styled.h1`
  width: fit-content;
  color: var(--color-text-inverse);
  background-color: var(--color-black-shadow);
  padding: var(--size-16) var(--size-32);
  margin-bottom: var(--size-16);
`

const Description = styled.p`
  width: fit-content;
  color: var(--color-text-inverse);
  background-color: var(--color-black-shadow);
  padding: var(--size-8) var(--size-16);
`

export const PageHeader = ({ name, description, profilePicture, profilePictureAccent }) => (
    <HeaderContainer>
      <TitleBackground picture={profilePictureAccent} />
      <PersonContainer>
        <StyledProfilePicture profilePicture={profilePicture} profilePictureAccent={profilePictureAccent} />

        <PersonInfoContainer>
          <Name className="font-64-bold">{name}</Name>
          {description && <Description className="font-24-regular">{description}</Description>}
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
