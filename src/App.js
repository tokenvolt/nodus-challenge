import React from 'react'
import styled from 'styled-components'
import {
  Flex,
  Box,
  Fixed
} from 'rebass'
import SearchPanel from 'components/SearchPanel'
import { State } from 'libreact/lib/State'
import Favourites from 'components/Favourites'
import SearchResultsPanel from 'components/SearchResultsPanel'
import { connect } from 'react-redux'
import types from 'constants/actionTypes'

const toggleStar = (set, { starredSearches, searchTerm }) => {
  if (starredSearches.includes(searchTerm)) {
    return set({ starredSearches: starredSearches.filter(star => star !== searchTerm) })
  }

  set({ starredSearches: [...starredSearches, searchTerm] })
}

const Sidebar = styled(Box)`
  height: 100vh;
  border-left: 1px solid #eee;
  box-shadow: -3px 0 10px #eee;
`

const App = ({
  starredSearches,
  dispatch,
  pending,
  performed,
  lastSearchTerm,
  searchResults
}) => (
  <div>
    <Flex flexWrap='wrap'>
      <State init={{ searchTerm: '', starredSearches }}>{({
        searchTerm,
        starredSearches
      }, set) =>
        <React.Fragment>
          <Box width={5/7}>
            <SearchPanel
              currentSearchTermIsStarred={starredSearches.includes(searchTerm)}
              onStarClick={() => toggleStar(set, { starredSearches, searchTerm })}
              searchTerm={searchTerm}
              pending={pending}
              onSearch={() => dispatch({ type: types.SEARCH_REQUEST, payload: { searchTerm } })}
              onInput={(e) => set({ searchTerm: e.target.value })}
            />
            <SearchResultsPanel
              data={searchResults}
              searchTerm={lastSearchTerm}
              pending={pending}
              performed={performed}
            />
          </Box>
          <Box width={2/7}>
            <Fixed>
              <Sidebar p={3}>
                <Favourites
                  data={starredSearches}
                  onItemClick={(item) => set({ searchTerm: item })}
                />
              </Sidebar>
            </Fixed>
          </Box>
        </React.Fragment>
      }</State>
    </Flex>
  </div>
)

App.propTypes = {
  starredSearches: [],
  searchResults: []
}

App.defaultProps = {
  starredSearches: [],
  searchResults: []
}

export default connect(state => ({
  searchResults: state.data,
  pending: state.pending,
  performed: state.performed,
  lastSearchTerm: state.lastSearchTerm
}))(App)
