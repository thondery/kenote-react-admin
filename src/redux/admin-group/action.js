// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'
import { HttpServices, REDUX_FETCH_TIMEOUT } from 'services/utils'
import * as storageService from 'services/storage'
import { getToken } from 'services/token'

export function getlist () {
  return dispatch => {
    dispatch(createAction(types.ADMINS_GROUP_LIST_BEGIN, null))
    setTimeout(() => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.GET('/admins/group', { accesstoken: token })
          dispatch(createAction(types.ADMINS_GROUP_LIST_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.ADMINS_GROUP_LIST_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}

export function saveAdd (data) {
  return dispatch => {
    dispatch(createAction(types.ADMINS_GROUP_ADD_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.POST(`/admins/group/create`, { ...data, accesstoken: token })
          dispatch(createAction(types.ADMINS_GROUP_ADD_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.ADMINS_GROUP_ADD_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}

export function remove (_id) {
  return dispatch => {
    dispatch(createAction(types.ADMINS_GROUP_REMOVE_BEGIN, null))
    return new Promise(async (resolve, reject) => {
      try {
        const token = getToken()
        const result = await HttpServices.POST(`/admins/group/remove`, { _id, accesstoken: token })
        dispatch(createAction(types.ADMINS_GROUP_REMOVE_SUCCESS, result))
        resolve(result)
      } catch (error) {
        dispatch(createAction(types.ADMINS_GROUP_REMOVE_FAILURE, error))
        reject(error)
      }
    })
    .catch(() => {})
  }
}

export function saveEdit (_id, data) {
  return dispatch => {
    dispatch(createAction(types.ADMINS_GROUP_EDIT_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.POST(`/admins/group/edit/${_id}`, { ...data, accesstoken: token })
          dispatch(createAction(types.ADMINS_GROUP_EDIT_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.ADMINS_GROUP_EDIT_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}