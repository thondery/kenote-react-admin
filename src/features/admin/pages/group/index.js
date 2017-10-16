import React, { PureComponent } from 'react'
import { CoreLayout, LayoutBreadcrumb } from 'layouts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Form, Input, InputNumber, Select, Button, Icon, Table, Popconfirm, Modal } from 'antd'
import { adminGroupActions } from 'reduxs'
import AddModal from './add-modal'
import EditModal from './edit-modal'

@connect(
  state => ({
    auth:     state.Passport.auth,
    ...state.AdminGroup,
  }),
  dispatch => ({
    actions: bindActionCreators({...adminGroupActions}, dispatch)
  })
)
export default class AdminGroup extends PureComponent {

  state = {
    model: null,
    selectId: null
  }

  constructor (props) {
    super(props)
  }
  
  componentDidMount () {
    this.props.actions.getlist()
  }

  render () {
    const { auth, location, getListPending, listData } = this.props
    const options = { auth, location, pageCode: '9001' }
    const Header = this.renderHeader
    const breadcCrumb = [
      { name: '主页',       link: `/` },
      { name: '帐号管理',    link: `/admins` },
      { name: '管理组设定' },
    ]
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 60,
      },
      {
        title: '管理组',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: '权级',
        dataIndex: 'level',
        key: 'level',
        width: 100,
      },
      {
        title: '用户数',
        dataIndex: 'counts',
        key: 'counts',
        width: 100,
      },
      {
        title: '描述',
        key: 'desc',
        render: (record) => <span>{record.desc || ''}</span>,
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        render: (text, record) => record.lock ? (
          <span>
            <a onClick={() => this.setState({ model: 'edit', selectId: record._id })}>编辑</a>
          </span>
        ) : (
          <span>
            <a onClick={() => this.setState({ model: 'edit', selectId: record._id })}>编辑</a>
            <span className="ant-divider" />
            {record.counts > 0 ? (
              <a onClick={() => Modal.warning({
                title: '提示',
                content: '请先移除该组下所有用户'
              })}>删除</a>
            ) : (
              <Popconfirm title={`确定要删除该管理组吗？`}
                onConfirm={() => this.props.actions.remove(record._id)}>
                <a>删除</a>
              </Popconfirm>
            )}
          </span>
        )
      }
    ]
    listDataByKey(listData || [])
    return (
      <CoreLayout {...options}>
        <LayoutBreadcrumb data={breadcCrumb} />
        <div style={{ marginBottom: 20 }}>
          <Button
            size={'large'}
            type={'primary'}
            onClick={() => this.setState({ model: 'add', selectId: null })} >
            创建管理组
          </Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={listData}
          pagination={false}
          loading={getListPending} 
          bordered
          />
        <AddModal
          visible={this.state.model === 'add'}
          closeModel={() => this.setState({ model: null, selectId: null })} 
          />
        <EditModal 
          visible={this.state.model === 'edit'}
          selectId={this.state.selectId}
          closeModel={() => this.setState({ model: null, selectId: null })} 
          />
      </CoreLayout>
    )
  }
}

const listDataByKey = (data) => {
  for (let e of data) {
    e.key = e.gid
  }
}