import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button, Input, InputNumber, Checkbox, message } from 'antd'
import WrappedAddForm from './add-form'
import '../../../../styles/modal.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { adminGroupActions } from 'reduxs'

@connect(
  state => ({
    addPending: state.AdminGroup.addPending,
    addError: state.AdminGroup.addError,
    addMessage: state.AdminGroup.addMessage
  }),
  dispatch => ({
    actions: bindActionCreators({...adminGroupActions}, dispatch)
  })
)
export default class AddModal extends PureComponent {
  
  static PropTypes = {
    visible: PropTypes.bool,
    closeModel: PropTypes.func
  }

  static defaultProps = {
    visible: false,
    closeModel: () => null
  }

  constructor (props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this._addForm = null
  }

  componentWillReceiveProps (nextProps) {
    const { visible, addPending, addError, addMessage } = nextProps
    if (addError !== this.props.addError) {
      addError === 0 && this.handleCancel()
      addError > 0 && message.error(addMessage)
    }
    if (visible === this.props.visible) return
  }
  
  render () {
    const { addPending } = this.props
    const setting = {
      title: '创建管理组',
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
          loading={addPending}
          onClick={this.handleOk}
          >
          提交
        </Button>
      ],
      width: 800,
      maskClosable: false
    }
    return (
      <Modal {...setting}>
        <WrappedAddForm 
          ref={ view => this._addForm = view } />
      </Modal>
    )
  }
  
  handleCancel (e) {
    this._addForm.resetFields()
    this.props.closeModel()
  }

  handleOk () {
    this._addForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.actions.saveAdd({
          name    : values.name,
          level   : values.level,
          flag    : values.flag,
          desc    : values.desc
        })
      }
    })
  }
}