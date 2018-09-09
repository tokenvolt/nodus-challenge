import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StarButton from 'components/StarButton'
import {
  Absolute,
  Flex,
  Box,
  Button,
  Input,
  Relative,
  Text
} from 'rebass'

const SearchInput = styled(Input)`
  border-bottom: 1px solid #999;
  padding: 10px 16px;
  border-radius: 0;
`

const Wrapper = styled(Box)`
  min-height: 100px;
`

const SearchPanel = ({
  searchTerm,
  currentSearchTermIsStarred,
  onStarClick,
  onSearch,
  pending,
  onInput
}) => (
  <Flex>
    <Wrapper width={[ 1 ]} p={3}>
      <Text mb={4} fontWeight="bold" fontSize={4}>Welcome to Nodus Research</Text>
      <Flex>
        <SearchInput
          value={searchTerm}
          onChange={onInput}
          onKeyPress={e => {
            if (e.key === 'Enter') onSearch()
          }}
          mr={2}
          placeholder='Type to search...'
        />
        <Relative>
          <Absolute left={-36} top={4}>
            <StarButton onClick={onStarClick} active={currentSearchTermIsStarred} size={24} />
          </Absolute>
        </Relative>
        <Button onClick={onSearch} disabled={pending || !searchTerm}>
          Search
        </Button>
      </Flex>
    </Wrapper>
  </Flex>
)

SearchPanel.defaultProps = {
  searchTerm: ''
}

SearchPanel.propTypes = {
  searchTerm: PropTypes.string,
  currentSearchTermIsStarred: PropTypes.bool,
  pending: PropTypes.bool,
  onStarClick: PropTypes.func,
  onSearch: PropTypes.func,
  onInput: PropTypes.func
}

export default SearchPanel
