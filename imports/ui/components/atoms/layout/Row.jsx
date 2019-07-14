import classNames from 'classnames'

import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { MediaSmall } from '../../../styles/variables'

const RowContainer = styled.div`
  width: 100%;
  margin-top: ${({ marginTop }) => (marginTop ? 1 : 0)}rem;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? 3 : 0)}rem;

  &.center {
    display: flex;
    justify-content: center;
  }

  :after {
    content: ' ';
    display: table;
    clear: both;
  }

  & > .column:not(:first-child) {
    margin-top: ${({ columnMargin }) => (columnMargin ? 'var(--size-64)' : '0px')};
  }

  @media ${MediaSmall} {
    & > .column:not(:first-child) {
      margin-top: var(--size-64);
    }
  }
`

export const Row = ({ children, center, className, ...other }) => (
  <RowContainer className={classNames(center && 'center', className)} {...other}>
    {children}
  </RowContainer>
)

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  center: PropTypes.bool,
}
