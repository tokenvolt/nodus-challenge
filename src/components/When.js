import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

/**
 * Declarative IF component
 */
const When = ({ is, children }) =>
  is && children ? <Fragment>{children}</Fragment> : null

When.propTypes = {
  is: PropTypes.bool
}

export default When
