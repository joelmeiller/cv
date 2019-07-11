/* eslint-disable max-len, react/display-name, react/prop-types */

// Node
import classNames from 'classnames'

// React
import React from 'react'
import PropTypes from 'prop-types'

const toSolutionIcon = Icon => viewBox => ({ className }) => (
  <svg
    className={classNames('icon', className)}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {Icon()}
  </svg>
)

export default toSolutionIcon
