import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Link = styled.a`
  color: ${({ accent }) => (accent ? 'var(--color-accent)' : 'var(--color-text-mark)')};
  text-decoration-line: underline;
`

export const LinkText = ({ text, url, accent }) => (
    <Link href={url} target="_blank" accent={accent}>
      {text}
    </Link>
)
