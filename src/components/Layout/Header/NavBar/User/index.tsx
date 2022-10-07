import React from 'react'
import { observer } from 'mobx-react'

import { Menu, Dropdown } from 'antd'
import authApi from '~/api/auth'
import useStores from '~/hooks/useStores'
import './index.less'
import Avatar from './Avatar'
import Name from './Name'

const User = () => {
    const { User: UserStore } = useStores()

    // 打开登录框
    const handleLoginDialog = () => {
        if (!UserStore.isLogin) {
            UserStore.changeDiaLogShow(true)
        }
    }

    // 退出登录
    const logOut = async () => {
       console.log('aa')
       await authApi.logout()
       UserStore.logoutUser()
    }

    return (
        <div className='user' onClick={handleLoginDialog}>
            <Avatar picurl={UserStore?.user.profile?.avatarUrl} />
            {
                UserStore.isLogin ? (
                    <Dropdown
                      overlay={(
                          <Menu>
                              <Menu.Item>
                                  <span onClick={logOut}>退出登录</span>
                              </Menu.Item>
                          </Menu>
)}
                      trigger={['click']}>
                        <span>
                            <Name username={UserStore?.user.profile?.nickname} id={UserStore.user.profile?.userId} />
                        </span>
                    </Dropdown>
) : <Name username={UserStore?.user.profile?.nickname} id={UserStore.user.profile?.userId} />
            }
        </div>
    )
 }

export default observer(User)
