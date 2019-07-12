import React, { Fragment } from 'react'
import styled from 'styled-components'

const NavigationContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
`

const Button = styled.button`
  cursor: pointer;
  color: var(--color-text-inverse);
  background-color: transparent;
  border: none;

  &:hover {
    color: var(--color-accent);
  }
`

export const Navigation = ({ showComments, user, onLogin, onLogout, onShowComments }) => (
  <NavigationContainer>
    {user ? (
      <Fragment>
        <Button className="font-12-regular" onClick={onShowComments}>
          {showComments ? 'Hide Comments' : 'Show/Add Comments'}
        </Button>
        <Button className="font-12-regular" onClick={onLogout}>
          Logout
        </Button>
      </Fragment>
    ) : (
      <Button className="font-12-regular" onClick={onLogin}>
        Login
      </Button>
    )}
  </NavigationContainer>
)
