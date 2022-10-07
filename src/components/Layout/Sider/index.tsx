import React, {
 Fragment, useCallback, useEffect,
} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import { observer } from 'mobx-react'

import { Menu } from 'antd'
import useStores from '~/hooks/useStores'
import './index.less'
import songListApi from '~/api/songlist'
import { menuRoutes } from '~/router/index'
import { filterPath } from '~/utils/filter'
import MenuTitle from './Title/index'

const Silder = () => {
    const { pathname } = useLocation()
    const { push } = useHistory()
    const { User } = useStores()
    const { isLogin, user } = User

    const [songlistState, getUserSonglistFn] = useAsyncFn(songListApi.getUserSonglist)
    
    useEffect(() => {
        /* 获取用户的创建歌单和收藏歌单 */
        if (isLogin) {
            getUserSonglistFn(user.profile?.userId || 0)
        }
    }, [isLogin])

    /* 点击路由跳转页面 */
    const toMenupath = useCallback(
        (e) => {
            if (e.key !== filterPath(pathname)) push(e.key)
        },
        [pathname],
    )

    return (
        <Menu
          className='sider-bar'
          defaultSelectedKeys={[filterPath(pathname)]}
          mode='inline'
          key={filterPath(pathname)}
          onClick={(e) => toMenupath(e)}>
            <>
                {
                menuRoutes.map(({
 path, title, Icon, 
}) => (
    <Fragment key={path}>
        {/* 本地音乐上面添加一个我的音乐 */}
        {title === '本地音乐' && <MenuTitle title='我的音乐' />}
        <Menu.Item key={path} icon={Icon && <Icon />}>
            {title}
        </Menu.Item>
    </Fragment>
                    ))
            }
                {/* 创建歌单和收藏歌单 */}
                {!songlistState.loading && isLogin && (
                    <>
                        <MenuTitle title='创建的歌单' />
                        {songlistState.value?.create.map((item) => (
                            <Menu.Item key={`/songlists/${item.id}`}>
                                {item.name}
                            </Menu.Item> 
                        ))}
                        <MenuTitle title='收藏的歌单' />
                        {songlistState.value?.collect.map((item) => (
                            <Menu.Item key={`/songlists/${item.id}`}>
                                {item.name}
                            </Menu.Item> 
                        ))}
                    </>
                )}
            </>
        </Menu>
    )
}

export default observer(Silder)
