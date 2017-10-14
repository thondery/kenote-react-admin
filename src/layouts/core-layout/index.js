// ------------------------------------
// Component -- CoreLayout
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Header, Sider } from '../'
import { Permission } from '../../components'

export default class CoreLayout extends PureComponent {
  
  static propTypes = {
    children: PropTypes.node,
    pageCode: PropTypes.string,
    auth: PropTypes.object,
  }
  
  static defaultProps = {
    children: null,
    pageCode: 'none',
    auth: null,
  }

  constructor (props) {
    super(props)
    this._loadingView = null
  }
  
  componentWillMount () {
    console.log('start')
  }

  componentDidMount () {
    console.log('end')
    this._loadingView.style.width = '100%'
    this._loadingView.style.opacity = 0
  }
  
  render() {
    const { location, children, auth, pageCode } = this.props
    const permissionView = this.renderPermission()
    return (
      <div className={'layout-warpper'} style={{ flexDirection: 'column' }}>
        <Header />
        <div className={'layout-warpper'}>
          <Sider location={location} />
          <Permission 
            className={'layout-page-container'}
            pageCode={pageCode} 
            flag={auth && auth.group.flag || []}
            viewComponent={permissionView}>
            <div>{children}</div>
            <div 
              className={'layout-page-loading'} 
              ref={ view => this._loadingView = view } 
              style={{ width: '0%' }} 
              />
          </Permission>
        </div>
      </div>
    )
  }
  
  renderPermission () {
    return (
      <div className="layout-page-not-found">
        <div className="page-not-found">
          <h1>401</h1>
          <div>
            <h2>The page is not allowed.</h2>
          </div>
        </div>
      </div>
    )
  }
}