import classNames from 'classnames'

import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { MediaSmall } from '../../../styles/variables'

const RowContainer = styled.div`
  width: 100%;
  margin-top: ${({ marginTop }) => (marginTop ? 1 : 0)}rem;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? 3 : 0)}rem;

  :after {
    content: ' ';
    display: table;
    clear: both;
  }

  @media ${MediaSmall} {
    & > .column:not(:first-child) {
      margin-top: var(--size-64);
    }
  }
`

export const Row = ({ children, center, className, ...other }) => (
  <RowContainer className={classNames('row', center && 'flex-center', className)} {...other}>
    {children}
  </RowContainer>
)

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  center: PropTypes.bool,
}
