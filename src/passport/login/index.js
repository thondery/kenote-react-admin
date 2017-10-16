// ------------------------------------
// Component -- Login
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { message } from 'antd'
import { passportActions } from 'reduxs'
import { WrappedLoginForm } from './modules'

@connect (
  state => ({
    loginPending  : state.Passport.loginPending, 
    loginMessage  : state.Passport.loginMessage, 
    loginError    : state.Passport.loginError
  }),
  dispatch => ({
    actions: bindActionCreators({...passportActions}, dispatch)
  })
)
export default class Login extends PureComponent {
  
  static propTypes = {
    
  }
  
  static defaultProps = {
    
  }

  constructor (props) {
    super(props)
    this.state = {
      
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  render() {
    return (
      <div className={'passport-wraper'}>
        <h1>账号登录</h1>
        <WrappedLoginForm
          onSubmit={this.handleSubmit}
          pending={this.props.loginPending}
          />
      </div>
    )
  }
  
  handleSubmit (values) {
    this.props.actions.login(values)
  }

  componentWillReceiveProps (nextProps) {
    let { loginPending, loginMessage, loginError } = nextProps
    if (loginError > 0) {
      message.error(loginMessage)
    }
      
  }
}