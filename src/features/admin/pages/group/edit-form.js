import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Checkbox, message } from 'antd'
import { flagData } from 'services/utils'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const { TextArea } = Input

@Form.create()
export default class EditForm extends PureComponent {

  render () {
    const { data } = this.props
    const { getFieldDecorator, getFieldValue, onChange } = this.props.form
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
            ],
            initialValue: data.name || ''
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
            initialValue: data.level || 0
          })(
            <InputNumber min={0} max={99} disabled={data.lock} />
          )}
        </FormItem><FormItem
          {...formItemLayout}
          label="权 限"
          hasFeedback>
          {getFieldDecorator('flag', {
            rules: [],
            initialValue: data.flag || []
          })(
            <CheckboxGroup options={flagOptions(data.lock)} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
          hasFeedback>
          {getFieldDecorator('desc', {
            rules: [],
            initialValue: data.desc || ''
          })(
            <TextArea rows={8} />
          )}
        </FormItem>
      </Form>
    )
  }
}

const flagOptions = (lock) => {
  const options = []
  for (let e of flagData) {
    options.push({
      label: e.name,
      value: e.code,
      disabled: lock
    })
  }
  return options
}