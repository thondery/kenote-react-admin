// ------------------------------------
// Component -- PageNotFound
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export default class PageNotFound extends PureComponent {
  
  static propTypes = {
    
  }
  
  static defaultProps = {
    
  }
  
  render() {
    return (
      <div className="layout-page-not-found">
        <div className="page-not-found">
          <h1>404</h1>
          <div>
            <h2>This page could not be found.</h2>
          </div>
        </div>
      </div>
    )
  }
}