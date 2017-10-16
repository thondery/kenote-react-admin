// ------------------------------------
// Component -- Sider
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Link } from 'react-router-dom'
import { Routes } from '../../features'
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu
import * as menuSubs from '../../features/menuSub'
import _ from 'lodash'

export default class Sider extends PureComponent {
  
  static propTypes = {
    location: PropTypes.object
  }
  
  static defaultProps = {
    location: null
  }
  
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  
  render() {
    const { location } = this.props
    const { pathname } = location
    const pathMatch = pathname.match(/^(\/)([a-z]+)/)
    return (
      <div className={'layout-sider'} 
        style={this.state.collapsed ? { flex: '0 0 64px' } : null}>
        <div className={'menu-collapsed'} 
          onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <Menu
          mode={'inline'}
          theme={'dark'}
          inlineCollapsed={this.state.collapsed}
          defaultOpenKeys={[pathMatch && pathMatch[2]]}
          selectedKeys={[pathname.toLowerCase()]}
          >
          {_.keys(menuSubs).map( (item, i) => {
            let { key, name, icon, data } = menuSubs[item]
            return this.renderSubMenu(key, name, icon, data)
          })}
        </Menu>
      </div>
    )
  }
  
  renderSubMenu (key, name, icon, data) {
    return (
      <SubMenu
        key={key}
        title={<span><Icon type={icon || 'appstore'} /><span>{name}</span></span>} >
        {data.map( (item, i) => {
          return(
            <Menu.Item key={`/${item.path}/${item.key}`}>
              <Link to={`/${item.path}/${item.key}`}>{item.name}</Link>
            </Menu.Item>
          )
        })}
      </SubMenu>
    )
  }
}