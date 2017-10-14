// ------------------------------------
// Component -- ProgressBar
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export default class ProgressBar extends PureComponent {
  
  static propTypes = {
    pending: PropTypes.number
  }
  
  static defaultProps = {
    pending: 0
  }
  
  render() {
    const { pending } = this.props
    return (
      <div className={'layout-progress-bar'}>
        <div className={'progress-bar-container'}>
          <div className={'progress-bar-pending'} style={{ width: pending }} />
        </div>
      </div>
    )
  }
}