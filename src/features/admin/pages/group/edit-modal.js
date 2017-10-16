import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button, Input, InputNumber, Checkbox, message } from 'antd'
import WrappedEditForm from './edit-form'
import '../../../../styles/modal.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { adminGroupActions } from 'reduxs'
import _ from 'lodash'

@connect(
  state => ({
    editPending: state.AdminGroup.editPending,
    editError: state.AdminGroup.editError,
    editMessage: state.AdminGroup.editMessage,
    listData: state.AdminGroup.listData
  }),
  dispatch => ({
    actions: bindActionCreators({...adminGroupActions}, dispatch)
  })
)
export default class EditModal extends PureComponent {
  
  static PropTypes = {
    visible: PropTypes.bool,
    closeModel: PropTypes.func,
    selectId: PropTypes.string
  }

  static defaultProps = {
    visible: false,
    closeModel: () => null,
    selectId: null
  }

  constructor (props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this._editForm = null
  }

  componentWillReceiveProps (nextProps) {
    const { visible, editPending, editError, editMessage } = nextProps
    if (editError !== this.props.editError) {
      editError === 0 && this.handleCancel()
      editError > 0 && message.error(editMessage)
    }
    if (visible === this.props.visible) return
  }
  
  render () {
    const { selectId, listData, editPending } = this.props
    const useGroup = _.find(listData, { _id: selectId })
    const setting = {
      title: '编辑管理组',
      onCancel: this.handleCancel,
      onOk: this.handleOk,
      visible: this.props.visible,
      footer: [
        <Button
          key={'back'}
          size={'large'}
          onClick={this.handleCancel}>
          取消
        </Button>,
        <Button
          key={'create'}
          size={'large'}
          type={'primary'}
          loading={editPending}
          onClick={this.handleOk}>
          提交
        </Button>
      ],
      width: 800,
      maskClosable: false
    }
    return (
      <Modal {...setting}>
        <WrappedEditForm 
          ref={view => this._editForm = view}
          data={useGroup || {}} 
          />
      </Modal>
    )
  }
  
  handleCancel (e) {
    this._editForm.resetFields()
    this.props.closeModel()
  }

  handleOk () {
    const { selectId } = this.props
    this._editForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.actions.saveEdit(selectId, {
          name    : values.name,
          level   : values.level,
          flag    : values.flag,
          desc    : values.desc
        })
      }
    })
  }
}