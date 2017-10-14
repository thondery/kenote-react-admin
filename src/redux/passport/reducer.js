// ------------------------------------
// Reducer
// ------------------------------------
import { createReducer, statusToError, getStatusError } from 'http-services'
import * as types from './constant'
import * as storageService from '../../services/storage'
import { getToken, setToken } from '../../services/token'

const initState = {
  loginPending: false,
  loginError: -1,
  loginMessage: null,
  initialPending: false,
  initialError: -1,
  initialMessage: null,
  logoutPenging: false,
  auth: null,
  editPwdPending: false,
  editPwdError: -1,
  editPwdMessage: null
}

const ACTION_HANDLERS = {
  [types.PASSPORT_INITIAL_BEGIN]: (state, action) => {
    return {
      ...state,
      initialPending: true,
      initialError: -1,
      initialMessage: null
    }
  },
  [types.PASSPORT_INITIAL_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    updateAuth(payload)
    return {
      ...state,
      ...statusToError(payload, 'initialError', 'initialMessage'),
      initialPending: false,
      auth: data ? data.auth : null,
    }
  },
  [types.PASSPORT_INITIAL_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'initialError', 'initialMessage'),
      initialPending: false,
    }
  },
  [types.PASSPORT_LOGIN_BEGIN]: (state, action) => {
    return {
      ...state,
      loginPending: true,
      loginError: -1,
      loginMessage: null
    }
  },
  [types.PASSPORT_LOGIN_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    updateAuth(payload)
    return {
      ...state,
      ...statusToError(payload, 'loginError', 'loginMessage'),
      loginPending: false,
      auth: data ? data.auth : null,
    }
  },
  [types.PASSPORT_LOGIN_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'loginError', 'loginMessage'),
      loginPending: false,
    }
  },
  [types.PASSPORT_LOGINOUT_BEGIN]: (state, action) => {
    return {
      ...state,
      logoutPenging: true 
    }
  },
  [types.PASSPORT_LOGINOUT_FINISH]: (state, action) => {
    updateAuth(null)
    return {
      ...state,
      logoutPenging: false,
      auth: null 
    }
  },
  [types.PASSPORT_EDITPWD_BEGIN]: (state, action) => {
    return {
      ...state,
      editPwdPending: true,
      editPwdError: -1,
      editPwdMessage: null
    }
  },
  [types.PASSPORT_EDITPWD_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'editPwdError', 'editPwdMessage'),
      editPwdPending: false
    }
  },
  [types.PASSPORT_EDITPWD_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'editPwdError', 'editPwdMessage'),
      editPwdPending: false,
    }
  }
}

export default (state = initState, action) => createReducer(state, action, ACTION_HANDLERS)

function updateAuth (payload) {
  if (!payload) {
    storageService.removeItem('auth')
    setToken(null)
    return
  }
  const { data, status } = payload
  if (status.code === 0) {
    const { auth } = data
    storageService.setItem('auth', auth)
    setToken(auth.tokenkey)
  }
}