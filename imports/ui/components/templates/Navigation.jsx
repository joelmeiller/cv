import React, { Fragment } from 'react'
import styled from 'styled-components'
import { MediaSmall } from '../../styles/variables'

const NavigationContainer = styled.div`
  position: ${({ loggedIn }) => loggedIn ? 'fixed' : 'absolute'};
  display: flex;
  top: 5px;
  right: 20px;
  z-index: 9999;
  background-color: rgba(0,0,0,0.38);

  @media ${MediaSmall} {
    display: none;
  }
`

const Button = styled.button`
  position: relative;
  cursor: pointer;
  color: var(--color-text-inverse);
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 4px 8px 3px;

  &:hover {
    color: var(--color-accent);
  }
`

export const Navigation = ({ showComments, user, onLogin, onLogout, onShowComments }) => (
  <NavigationContainer loggedIn={!!user} className="no-print" >
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
