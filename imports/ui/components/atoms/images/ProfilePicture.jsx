import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  border-radius: 50%;
  background-color: #ffffff80;
  background-size: cover;
  background-position: 50% 50%;
  background-image: url(${({ profilePicture }) => profilePicture});
  transition: background-image 1.2s;

  &:hover {
    background-image: url(${({ profilePictureAccent }) => profilePictureAccent});    
  }
`

export const ProfilePicture = ({ className, profilePicture, profilePictureAccent }) => (
  <Container className={className} profilePicture={profilePicture} profilePictureAccent={profilePictureAccent} />
)

ProfilePicture.propTypes = {
  className: PropTypes.string,
  profilePicture: PropTypes.string,
  profilePictureAccent: PropTypes.string,
}
