import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Link = styled.a`
  color: ${({ accent }) => (accent ? 'var(--color-primary)' : 'var(--color-text-mark)')};
  text-decoration-line: underline;
  transition: color 0.2s;

  :hover {
    text-decoration-line: underline;
    color: var(--color-accent);
  }
`

export const LinkText = ({ text, url, accent }) => (
    <Link href={url} target="_blank" accent={accent}>
      {text}
    </Link>
)
