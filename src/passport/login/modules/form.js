import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'

const FormItem = Form.Item

@Form.create()
export default class LoginForm extends PureComponent {
  
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={'form-container'}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
            //initialValue: undefined
          })(
            <Input 
              prefix={<Icon type={'user'} style={{ fontSize: 13 }} />} 
              autoComplete="off"
              placeholder={'用户名'} />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
            //initialValue: undefined
          })(
            <Input 
              prefix={<Icon type={'lock'} style={{ fontSize: 13 }} />} 
              type={'password'} 
              autoComplete="off"
              placeholder={'密 码'} />
          )}
        </FormItem>
        <FormItem>
          <Button 
            type={'primary'} 
            htmlType={'submit'} 
            className={'form-button'} 
            icon={'login'}
            loading={this.props.pending}>
            登 录
          </Button>
        </FormItem>
      </Form>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }
}