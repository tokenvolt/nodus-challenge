import { call } from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'
import { fetchArticle, search } from './sagas'
import types from 'constants/actionTypes'
import api from 'services/api'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'

it('fetchArticle :: success', () => {
  const action = { payload: { id: 1 } }
  const fakeResponse = {
    data: {
      result: {
        1: {
          title: 'Article Title',
          authors: [
            { name: 'Bob' },
            { name: 'Tom' }
          ],
          pubdate: '29 Aug 2018'
        }
      }
    }
  }

  const transformedArticle = { title: 'Article Title', authors: 'Bob and Tom', date: '29 Aug 2018' }
  const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=1&retmode=json&tool=my_tool&email=my_email@example.com'

  return expectSaga(fetchArticle, action)
    .provide([
      [matchers.call.fn(api, url), fakeResponse]
    ])
    .put({ type: types.FETCH_ARTICLE_SUCCESS, payload: { article: transformedArticle } })
    .run()
})

it('fetchArticle :: error', () => {
  const action = { payload: { id: 1 } }
  const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=1&retmode=json&tool=my_tool&email=my_email@example.com'

  return expectSaga(fetchArticle, action)
    .provide([
      [matchers.call.fn(api, url), throwError({ error: 'error' })]
    ])
    .put({ type: types.FETCH_ARTICLE_FAILURE, payload: { error: 'error' } })
    .run()
})


it('search :: success', () => {
  const action = { payload: { searchTerm: 'eye' } }
  const fakeResponse = {
    data: {
      esearchresult: {
        idlist: [1, 2, 3]
      }
    }
  }
  const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=eye&retmode=json&tool=my_tool&email=my_email@example.com'

  return expectSaga(search, action)
    .provide([
      [matchers.call.fn(api, url), fakeResponse]
    ])
    .put({ type: types.CLEAN_SEARCH_RESULTS })
    .put({ type: types.SEARCH_SUCCESS, payload: { lastSearchTerm: 'eye' } })
    .put({ type: types.FETCH_ARTICLE_REQUEST, payload: { id: 1 } })
    .put({ type: types.FETCH_ARTICLE_REQUEST, payload: { id: 2 } })
    .put({ type: types.FETCH_ARTICLE_REQUEST, payload: { id: 3 } })
    .run()
})


it('search :: error', () => {
  const action = { payload: { searchTerm: 'eye' } }
  const fakeResponse = {
    data: {
      esearchresult: {
        idlist: [1, 2, 3]
      }
    }
  }
  const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=eye&retmode=json&tool=my_tool&email=my_email@example.com'

  return expectSaga(search, action)
    .provide([
      [matchers.call.fn(api, url), throwError({ error: 'error' })]
    ])
    .put({ type: types.SEARCH_FAILURE, payload: { error: 'error' } })
    .run()
})
