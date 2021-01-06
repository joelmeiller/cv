import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.button`
  position: relative;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  background: var(--color-black-shadow);
  overflow: hidden;

  .preview-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .accent-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s;
    z-index: 2;
  }

  :hover  {
    .accent-image {
      opacity: 1;
    }
  }
`

export const ProfilePicture = ({
  className,
  profilePicturePreview,
  profilePicture,
  profilePictureAccent,
  profilePictureAccentPreview,
}) => {
  const [ssrDone, setSsrDone] = useState(false)
  useEffect(() => {
    setSsrDone(true)
  }, [])

  return (
  <Container
    className={className}
    profilePicture={profilePicturePreview}
    profilePictureAccent={profilePictureAccentPreview}
  >
    <img className="preview-image" src={profilePicturePreview} />
    {ssrDone && <img className="image" src={profilePicture} />}
    {ssrDone && <img className="accent-image" src={profilePictureAccent} />}
  </Container>
  )
}

