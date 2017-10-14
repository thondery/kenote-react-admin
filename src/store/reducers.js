import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as Reduxs from '../redux'
import { getReducers } from '../services/utils'

const Reducers = getReducers(Reduxs)

export default combineReducers({
  router     : routerReducer,
  ...Reducers
})