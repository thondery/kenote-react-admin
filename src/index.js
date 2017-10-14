import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import Root from './containers/root'
import configureStore from './store/configureStore'
import routeConfig from './store/routeConfig'

const rootNode = document.getElementById('root')
const store = configureStore()

window.render = () => {
  render(
    <AppContainer>
      <Root store={store} routeConfig={routeConfig} />
    </AppContainer>,
    rootNode
  )
  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./containers/root', () => {
      const NextRoot = require('./containers/root').default // eslint-disable-line
      render(
        <AppContainer>
          <NextRoot store={store} routeConfig={routeConfig} />
        </AppContainer>,
        rootNode
      )
    })
  }
}