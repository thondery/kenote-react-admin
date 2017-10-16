// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'
import { HttpServices, REDUX_FETCH_TIMEOUT } from 'services/utils'
import * as storageService from 'services/storage'
import { getToken } from 'services/token'

export function initial () {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_INITIAL_BEGIN, null))
    setTimeout(() => {
      return new Promise(async (resolve, reject) => {
        try {
          const auth = await storageService.getItem('auth')
          const accesstoken = _.has(auth, 'accesskey') && auth.accesskey
          const result = await HttpServices.POST('/accesstoken', { accesstoken })
          dispatch(createAction(types.PASSPORT_INITIAL_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.PASSPORT_INITIAL_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}

export function login (options) {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_LOGIN_BEGIN, null))
    setTimeout(() => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await HttpServices.POST('/login', options)
          dispatch(createAction(types.PASSPORT_LOGIN_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.PASSPORT_LOGIN_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}

export function logout () {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_LOGINOUT_BEGIN, null))
    setTimeout(() => {
      dispatch(createAction(types.PASSPORT_LOGINOUT_FINISH, null))
    }, REDUX_FETCH_TIMEOUT)
  }
}

export function editpwd (password) {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_EDITPWD_BEGIN, null))
    setTimeout(() => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.POST(`/passport/editpwd`, { password, accesstoken: token })
          dispatch(createAction(types.PASSPORT_EDITPWD_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.PASSPORT_EDITPWD_FAILURE, error))
          reject(error)
        }
      })
    }, REDUX_FETCH_TIMEOUT)
  }
}