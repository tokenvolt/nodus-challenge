import types from 'constants/actionTypes'

const initialState = {
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

    default:
      return state
  }
}
