import React from 'react'
import { observer } from 'mobx-react'
import { useAsyncFn } from 'react-use'

import {
 Modal, Form, Input, Button, 
} from 'antd'
import { AndroidOutlined, LockOutlined } from '@ant-design/icons'
import authApi from '~/api/auth'
import useStores from '~/hooks/useStores'

const LoginDialog: React.FC = () => {
  const { User } = useStores()
  const [loginState, loginFn] = useAsyncFn(authApi.login)
  const { loading } = loginState

  const onFinish = async (values:any) => {
    const res = await loginFn(values)
    if (res?.code === 200) {
      User.loginUser(res)
    }
  }

  return (
      <>
          <Modal
            title='登录'
            visible={User.showLoginDialog}
            onCancel={(e) => User.changeDiaLogShow(false)}
            footer={null}
            destroyOnClose>
              <Form
                name='normal_login'
                onFinish={onFinish}>
                  <Form.Item
                    name='phone'
                    rules={[{ required: true, message: '请输入您的手机号!' }]}>
                      <Input prefix={<AndroidOutlined />} placeholder='请输入手机号' />
                  </Form.Item>
                  <Form.Item
                    name='password'
                    rules={[{ required: true, message: '请输入您的密码!' }]}>
                      <Input
                        prefix={<LockOutlined />}
                        type='password'
                        placeholder='请输入密码' />
                  </Form.Item>
                  <Form.Item labelAlign='right'>
                      <Button htmlType='submit' loading={loading}>
                          登录
                      </Button>
                  </Form.Item>
              </Form>
          </Modal>
      </>
  )
}

export default observer(LoginDialog)
