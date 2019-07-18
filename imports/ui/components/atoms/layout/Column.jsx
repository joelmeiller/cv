import classNames from 'classnames'

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { MediaSmall, MediaMedium } from '../../../styles/variables'

const ColumnContainer = styled.div`
  display: ${({ center, spaceBetween }) => (center || spaceBetween ? 'flex' : 'block')};
  justify-content: ${({ center, spaceBetween }) =>
    (center && 'center') || (spaceBetween && 'space-between') || 'flex-start'};
  align-items: center;
  flex-flow: ${({ flow }) => flow || 'column'};
  float: left;
  padding: ${({ padding }) => padding ? 'var(--size-16)' : 0};
  height: 100%;

  @media ${MediaSmall} {
    height: auto;
    padding-left: 0;
    padding-right: 0;
  }
  
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }

  &.right {
    float: right;
  }

  &.fullwidth {
    width: 100%;
  }

  &.half {
    width: 50%;

    @media ${MediaSmall} {
      width: 100%;
    }
  }

  &.third {
    width: 33.333%;

    @media ${MediaSmall} {
      width: 100%;
    }
  }

  &.two-third {
    width: 66.666%;

    @media ${MediaSmall} {
      width: 100%;
    }
  }

  &.sixth {
    width: 16.666%;

    @media ${MediaSmall} {
      width: 50%;
    }
  }

  &.twelfth {
    width: 8.333%;

    @media ${MediaMedium} {
      width: 25%;
    }

    @media ${MediaSmall} {
      width: 100%;
    }
  }

  &.quarter {
    width: 25%;

    @media ${MediaMedium} {
      width: 50%;
    }

    @media ${MediaSmall} {
      min-width: 100px;
      max-width: 100px;
    }
  }

  &.eigth {
    width: 12.5%;

    @media ${MediaSmall} {
      width: 50%;
    }
  }

  &.three-quarter {
    width: 75%;

    @media ${MediaSmall} {
      width: 100%;
    }
  }

  &.golden-13 {
    width: 38.235%;

    @media ${MediaMedium} {
      width: 50%;
    }

    @media ${MediaSmall} {
      width: 100%;
    }
  }

  &.golden-8 {
    width: 23.52%;

    @media ${MediaMedium} {
      display: none;
    }
  }

  &.print-half {
    @media print {
      width: 50%;
    }
  }
`

export const Column = ({
  children,
  className,
  eigth,
  fullwidth,
  half,
  quarter,
  third,
  twelfth,
  twoThird,
  golden13,
  golden8,
  printHalf,
  ...other
}) => (
  <ColumnContainer
    className={classNames('column', className, {
      eigth,
      fullwidth,
      half,
      quarter,
      third,
      twelfth,
      'two-third': twoThird,
      'golden-13': golden13,
      'golden-8': golden8,
      'print-half': printHalf,
    })}
    {...other}
  >
    {children}
  </ColumnContainer>
)

Column.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inline: PropTypes.bool,
  fullwidth: PropTypes.bool,
  golden13: PropTypes.bool,
  golden8: PropTypes.bool,
  half: PropTypes.bool,
  third: PropTypes.bool,
  twoThird: PropTypes.bool,
}
