import React, { memo } from 'react'

import './index.less'

import User from './User'
import MyLink from './Link'
import Item from './Item'

const Header = memo(() => (
    <div className='nav-bar'>
        <User />
        <Item />
        <MyLink />
    </div>
    ))

export default Header
