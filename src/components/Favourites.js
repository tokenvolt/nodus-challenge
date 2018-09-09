import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StarButton from 'components/StarButton'
import When from 'components/When'
import {
  Box,
  Text
} from 'rebass'
import { noop } from 'services/utils'

const List = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 8px;
    cursor: pointer;
    text-decoration: underline;
  }
`

const Favourites = ({
  data,
  onItemClick
}) => (
  <React.Fragment>
    <Text fontWeight='bold' fontSize={4} textAlign="center">
      Favourites <StarButton size={16} active style={{ verticalAlign: "baseline" }} />
    </Text>
    <Box mt={3}>
      <When is={data.length > 0}>
        <List>
          {data.map(star => <li key={star} onClick={() => {
            onItemClick(star)
            window.scrollTo(0, 0)
          }}>{star}</li>)}
        </List>
      </When>
    </Box>
  </React.Fragment>
)

Favourites.defaultProps = {
  onItemClick: noop,
  data: []
}

Favourites.propTypes = {
  onItemClick: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.string)
}

export default Favourites
