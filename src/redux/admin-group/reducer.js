// ------------------------------------
// Reducer
// ------------------------------------
import { createReducer, statusToError, getStatusError } from 'http-services'
import * as types from './constant'

const initState = {
  getListPending: false,
  getListError: -1,
  getListMessage: null,
  listData: null,
  addPending: false,
  addError: -1,
  addMessage: null,
  editPending: false,
  editError: -1,
  editMessage: null,
  removePending: false,
  removeError: -1,
  removeMessage: null
}

const ACTION_HANDLERS = {
  [types.ADMINS_GROUP_LIST_BEGIN]: (state, action) => {
    return {
      ...state,
      getListPending: false,
      getListError: -1,
      getListMessage: null,
      listData: null
    }
  },
  [types.ADMINS_GROUP_LIST_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'getListError', 'getListMessage'),
      getListPending: false,
      listData: data
    }
  },
  [types.ADMINS_GROUP_LIST_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'getListError', 'getListMessage'),
      getListPending: false,
      listData: null
    }
  },
  [types.ADMINS_GROUP_ADD_BEGIN]: (state, action) => {
    return {
      ...state,
      addPending: true,
      addError: -1,
      addMessage: null
    }
  },
  [types.ADMINS_GROUP_ADD_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'addError', 'addMessage'),
      addPending: false,
      listData: createItem(data, status, state.listData)
    }
  },
  [types.ADMINS_GROUP_ADD_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'addError', 'addMessage'),
      addPending: false
    }
  },
  [types.ADMINS_GROUP_REMOVE_BEGIN]: (state, action) => {
    return {
      ...state,
      removePending: true,
      removeError: -1,
      removeMessage: null
    }
  },
  [types.ADMINS_GROUP_REMOVE_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'removeError', 'removeMessage'),
      removePending: false,
      listData: data ? data : state.listData
    }
  },
  [types.ADMINS_GROUP_REMOVE_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'removeError', 'removeMessage'),
      removePending: false
    }
  },
  [types.ADMINS_GROUP_EDIT_BEGIN]: (state, action) => {
    return {
      ...state,
      editPending: true,
      editError: -1,
      editMessage: null
    }
  },
  [types.ADMINS_GROUP_EDIT_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'editError', 'editMessage'),
      editPending: false,
      listData: updateItem(data, status, state.listData)
    }
  },
  [types.ADMINS_GROUP_EDIT_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'editError', 'editMessage'),
      editPending: false
    }
  },
}

export default (state = initState, action) => createReducer(state, action, ACTION_HANDLERS)

function createItem (data, status, listData) {
  if (status.code !== 0) return listData
  listData.push(data)
  return listData
}

function updateItem (data, status, listData) {
  if (status.code !== 0) return listData
  const index = _.findIndex(listData, { _id: data._id })
  listData[index] = data
  return listData
}