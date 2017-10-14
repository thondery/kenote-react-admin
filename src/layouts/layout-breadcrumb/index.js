// ------------------------------------
// Component -- LayoutBreadcrumb
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

export default class LayoutBreadcrumb extends PureComponent {
  
  static propTypes = {
    data: PropTypes.array
  }
  
  static defaultProps = {
    data: null
  }
  
  render () {
    const { data } = this.props
    return (
      <Breadcrumb>
        {data.map( (item, i) => {
          return (
            <Breadcrumb.Item>
              {item.link ? (
                <Link to={item.link}>{item.name}</Link>
              ) : item.name}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    )
  }
}