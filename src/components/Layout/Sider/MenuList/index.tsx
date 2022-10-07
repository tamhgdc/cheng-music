import React, { memo, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd'
import { RouterConfig } from '~/router/index'

import Title from '../Title/index'

const MenuList: React.FC<RouterConfig> = memo(({
 path, title, Icon, render, 
}) => (
        !render
            ? (
                <Fragment key={path}>
                    {/* 本地音乐上面添加一个我的音乐 */}
                    {title === '本地音乐' && <Title title='我的音乐' />}
                    <Menu.Item key={path}>
                        <Link to={path}>
                            {Icon && <Icon />}
                            {title}
                        </Link>
                    </Menu.Item>
                </Fragment>
)
            : null
    ))

export default MenuList
