import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Checkbox, message } from 'antd'
import { flagData } from 'services/utils'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const { TextArea } = Input

@Form.create()
export default class AddForm extends PureComponent {

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    return (
      <Form layout={'horizontal'} className={'app-modal-form'}>
        <FormItem
          {...formItemLayout}
          label="组称谓"
          hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '组称谓不能为空!' }
            ]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="权 级"
          hasFeedback>
          {getFieldDecorator('level', {
            rules: [],
            initialValue: 99
          })(
            <InputNumber min={0} max={99} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="权 限"
          hasFeedback>
          {getFieldDecorator('flag', {
            rules: [],
            initialValue: []
          })(
            <CheckboxGroup options={flagOptions()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
          hasFeedback>
          {getFieldDecorator('desc', {
            rules: [],
            initialValue: ''
          })(
            <TextArea rows={8} />
          )}
        </FormItem>
      </Form>
    )
  }
}

const flagOptions = () => {
  const options = []
  for (let e of flagData) {
    options.push({
      label: e.name,
      value: e.code
    })
  }
  return options
}