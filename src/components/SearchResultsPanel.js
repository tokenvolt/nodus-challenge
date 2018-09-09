import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Flex,
  Box,
  Text
} from 'rebass'
import { Search } from 'styled-icons/fa-solid/Search.cjs'
import Spinner from 'components/Spinner'
import When from 'components/When'

const DecoratedSearchTerm = styled.span`
  color: #000;
  font-weight: bold;
  text-decoration: underline;
`

const SearchResult = styled(Box)`
  border-bottom: 1px solid #ddd;
`

const Title = styled.div`
  display: inline-block;
  margin-right: 8px;
`

const Meta = styled.span`
  color: #999;
  font-size: 12px;
`

const SearchResultsPanel = ({
  data,
  searchTerm,
  pending,
  performed
}) => (
  <Flex style={{ height: '75vh' }}>
    <Box width={[ 1 ]} p={3}>
      <Box my={3}>
        <When is={data.length > 0}>
          <Box>
            <Text color="#999">Best matches for <DecoratedSearchTerm>{searchTerm}</DecoratedSearchTerm>:</Text>
            {data.map(({ title, authors, date}) => (
              <SearchResult p={3}>
                <Title>{title}<Meta>{` - ${authors}, ${date}`}</Meta></Title>
              </SearchResult>
            ))}
          </Box>
        </When>
        <When is={data.length === 0 && performed && !pending}>
          <Flex justifyContent="center" mb={3}>
            <Search size={64} />
          </Flex>
          <Flex justifyContent="center">
            <Text>NO MATCHES FOUND</Text>
          </Flex>
        </When>
        <When is={pending}>
          <Flex justifyContent="center" mb={3}>
            <Spinner size={64} />
          </Flex>
        </When>
      </Box>
    </Box>
  </Flex>
)

SearchResultsPanel.propTypes = {
  searchTerm: PropTypes.string,
  pending: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.string),
  performed: PropTypes.bool
}

export default SearchResultsPanel
