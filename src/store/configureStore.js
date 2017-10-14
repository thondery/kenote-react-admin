import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import history from './history'
import rootReducer from './reducers'

const router = routerMiddleware(history)
const middlewares = [thunk, router]

let devToolsExtension = f => f

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger').createLogger
  const logger = createLogger({ collapsed: true })
  middlewares.push(logger)

  if (window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension()
  }
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    devToolsExtension
  ))

  /* istanbul ignore if  */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}