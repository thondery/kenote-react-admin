// ------------------------------------
// Screen -- Home
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { CoreLayout } from '../../layouts'
import { connect } from 'react-redux'

@connect(
  state => ({
    auth:     state.Passport.auth,
    ...state.Home
  }),
)
export default class Home extends PureComponent {
  
  constructor (props) {
    super(props)
  }
  
  render() {
    const { auth, location } = this.props
    const options = { auth, location }
    return (
      <CoreLayout {...options}>
        <span>::pathname:: => '{location.pathname}'</span>
      </CoreLayout>
    )
  }
}