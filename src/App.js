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
import types from 'misc/actionTypes'

const Sidebar = styled(Box)`
  height: 100vh;
  border-left: 1px solid #eee;
  box-shadow: -3px 0 10px #eee;
`

const App = ({
  favouriteSearches,
  dispatch,
  pending,
  performed,
  lastSearchTerm,
  searchResults
}) => (
  <div>
    <Flex flexWrap='wrap'>
      <State init={{ searchTerm: '' }}>{({
        searchTerm
      }, set) =>
        <React.Fragment>
          <Box width={5/7}>
            <SearchPanel
              currentSearchTermIsStarred={favouriteSearches.includes(searchTerm)}
              onStarClick={() => dispatch({
                type: types.PERSIST_FAVOURITES,
                payload: {
                  favouriteSearches: (favouriteSearches.includes(searchTerm)
                    ? favouriteSearches.filter(item => item !== searchTerm)
                    : [...favouriteSearches, searchTerm])
                }
              })}
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
                  data={favouriteSearches}
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
  favouriteSearches: [],
  searchResults: []
}

App.defaultProps = {
  favouriteSearches: [],
  searchResults: []
}

export default connect(state => ({
  favouriteSearches: state.favouriteSearches,
  searchResults: state.data,
  pending: state.pending,
  performed: state.performed,
  lastSearchTerm: state.lastSearchTerm
}))(App)
