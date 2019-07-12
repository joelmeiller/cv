import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.button`
  cursor: pointer;
  border: none;
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

export const ProfilePicture = ({ className, onClick, profilePicture, profilePictureAccent }) => (
  <Container className={className} onClick={onClick} profilePicture={profilePicture} profilePictureAccent={profilePictureAccent} />
)

ProfilePicture.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  profilePicture: PropTypes.string,
  profilePictureAccent: PropTypes.string,
}
