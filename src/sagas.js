import {
  all,
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import types from 'misc/actionTypes'
import api from 'services/api'
import * as R from 'ramda'
import arrayToSentence from 'array-to-sentence'
import { setAsync } from 'services/storage'
import { FAVOURITE_SEARCHES } from 'misc'

const searchUrl = (searchTerm) => `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=${searchTerm}&retmode=json&tool=my_tool&email=my_email@example.com`
const articleUrl = (id) => `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=${id}&retmode=json&tool=my_tool&email=my_email@example.com`
const searchResultPath = () => ['esearchresult', 'idlist']
const articleMetadataPath = (id) => ['result', id]

export function* fetchArticle(action) {
  const { id } = action.payload

  try {
    const { data } = yield call(api, articleUrl(id))

    const article = R.pathOr({}, articleMetadataPath(id), data)
    const result = {
      title: article.title,
      authors: arrayToSentence(article.authors.map(author => author.name)),
      date: article.pubdate
    }
    yield put({ type: types.FETCH_ARTICLE_SUCCESS, payload: { article: result } })
  } catch ({ error }) {
    yield put({ type: types.FETCH_ARTICLE_FAILURE, payload: { error } })
  }
}

export function* search(action) {
  const { searchTerm } = action.payload

  try {
    const { data } = yield call(api, searchUrl(searchTerm))
    yield put({ type: types.CLEAN_SEARCH_RESULTS })

    yield put({ type: types.SEARCH_SUCCESS, payload: { lastSearchTerm: searchTerm } })
    const ids = R.pathOr([], searchResultPath(), data)

    yield all(ids.map((id, idx) => {
      return put({ type: types.FETCH_ARTICLE_REQUEST, payload: { id } })
    }))
  } catch ({ error }) {
    yield put({ type: types.SEARCH_FAILURE, payload: { error } })
  }
}

export function* persistFavourites(action) {
  const { favouriteSearches } = action.payload

  yield call(setAsync, FAVOURITE_SEARCHES, favouriteSearches)
}

function* root() {
  yield takeEvery(types.FETCH_ARTICLE_REQUEST, fetchArticle)
  yield takeLatest(types.PERSIST_FAVOURITES, persistFavourites)
  yield takeLatest(types.SEARCH_REQUEST, search)
}

export default root
