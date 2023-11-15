import React, { Fragment } from 'react'
import styled from 'styled-components'
import { MediaSmall } from '../../styles/variables'

const NavigationContainer = styled.div`
  position: ${({ loggedIn }) => (loggedIn ? 'fixed' : 'absolute')};
  display: flex;
  align-items: baseline;
  top: 5px;
  right: 20px;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.38);
  color: var(--color-text-inverse);

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

const Switch = styled.div`
  display: flex;
  align-items: baseline;
  padding-left: 8px;
`

const SwitchButton = styled.button`
  position: relative;
  cursor: pointer;
  color: var(--color-text-inverse);
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 4px 2px 3px;

  &:hover {
    color: var(--color-accent);
  }
`

export const Navigation = ({
  language,
  showComments,
  user,
  onLogin,
  onLogout,
  onShowComments,
  onChangeLanugage,
  onPrint,
}) => (
  <NavigationContainer loggedIn={!!user} className="no-print">
    {user ? (
      <Fragment>
        <Button className="font-12-regular" onClick={onPrint}>
          Print
        </Button>
        <Button className="font-12-regular" onClick={onShowComments}>
          {showComments ? 'Hide Comments' : 'Show/Add Comments'}
        </Button>
        <Button className="font-12-regular" onClick={onLogout}>
          Logout
        </Button>
      </Fragment>
    ) : (
      <Fragment>
        <Button className="font-12-regular" onClick={onPrint}>
          Print
        </Button>
        <Button className="font-12-regular" onClick={onLogin}>
          Login
        </Button>
      </Fragment>
    )}

    <Switch>
      <SwitchButton
        className={language === 'en' ? 'font-14-bold' : 'font-12-regular'}
        onClick={() => onChangeLanugage('en')}
      >
        En
      </SwitchButton>
      /
      <SwitchButton
        className={language === 'de' ? 'font-14-bold' : 'font-12-regular'}
        onClick={() => onChangeLanugage('de')}
      >
        De
      </SwitchButton>
    </Switch>
  </NavigationContainer>
)
