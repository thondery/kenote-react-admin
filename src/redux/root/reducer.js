// ------------------------------------
// Reducer
// ------------------------------------
import { createReducer, statusToError, getStatusError } from 'http-services'
import * as types from './constant'

const initState = {
  initialPending: true,
  initialProgress: 15
}

const ACTION_HANDLERS = {
  [types.ROOT_INITIAL_COMPLETE]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      initialPending: false
    }
  },
  [types.ROOT_INITIAL_PENDING]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      initialProgress: payload.pending
    }
  },
}

export default (state = initState, action) => createReducer(state, action, ACTION_HANDLERS)