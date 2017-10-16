// ------------------------------------
// Utils
// ------------------------------------
import { httpServices } from 'http-services'
import config from '../config'
import _ from 'lodash'
export { default as flagData } from '../data/flag.json'

const { domain, apiPath } = config
export const REDUX_FETCH_TIMEOUT = 500
export const HttpServices = new httpServices(domain, apiPath)

export const getReducers = (Reduxs) => {
  let Reducers = {}
  for (let e of _.keys(Reduxs)) {
    if (!/Reducer$/.test(e)) continue
    Reducers[_.upperFirst(e.replace(/Reducer$/, ''))] = Reduxs[e]
  }
  return Reducers
}

export const getRoutes = (Features) => {
  let Routes = []
  for (let e of _.keys(Features)) {
    Routes.push(Features[e])
  }
  return Routes
}

export const getMenuSub = (routes, opts) => {
  let menuSub = {
    ...opts,
    data:  []
  }
  for (let e of routes.childRoutes) {
    !e.isIndex && menuSub.data.push({
      key: e.path,
      name: e.name,
      path: opts.key
    })
  }
  return menuSub
} 