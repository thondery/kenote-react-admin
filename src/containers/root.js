import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
//import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import history from '../store/history'
import '../styles/root.scss'
import { renderRouteConfigV3 } from '../store/routeConfig'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  }

  render () {
    const { store, routeConfig } = this.props
    const children = renderRouteConfigV3(null, routeConfig, '/')
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </Provider>
    )
  }
}