import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Star } from 'styled-icons/fa-solid/Star.cjs'
import { noop } from 'services/utils'

const StarButton = styled(Star)`
  color: ${props => props.active ? '#ffcc00' : '#e2e2e0'};
  cursor: pointer;
`

StarButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

StarButton.defaultProps = {
  active: false,
  onClick: noop
}

export default StarButton
