import types from 'misc/actionTypes'
import { get } from 'services/storage'
import { FAVOURITE_SEARCHES } from 'misc'

const initialState = {
  favouriteSearches: get(FAVOURITE_SEARCHES) || [],
  lastSearchTerm: null,
  pending: false,
  performed: false,
  data: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_REQUEST:
    case types.FETCH_ARTICLE_REQUEST: {
      return {
        ...state,
        pending: true
      }
    }

    case types.FETCH_ARTICLE_SUCCESS: {
      const { article } = action.payload

      return {
        ...state,
        pending: false,
        data: [...state.data, article]
      }
    }

    case types.SEARCH_SUCCESS: {
      const { lastSearchTerm } = action.payload

      return {
        ...state,
        performed: true,
        lastSearchTerm
      }
    }

    case types.CLEAN_SEARCH_RESULTS: {
      return {
        ...state,
        data: []
      }
    }

    case types.PERSIST_FAVOURITES: {
      const { favouriteSearches } = action.payload

      return {
        ...state,
        favouriteSearches
      }
    }

    default:
      return state
  }
}
