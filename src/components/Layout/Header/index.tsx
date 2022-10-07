import React, { memo } from 'react'

import './index.less'

import Logo from './Logo'
import BackForward from './BackForward'
import SearchPut from './SearchPut'
import NavBar from './NavBar'
import LoginDialog from './LoginDialog'

const Header = memo(() => (
    <div className='header'>
        <Logo />
        <div className='count'>
            <div className='count-left'>
                <BackForward />
                <SearchPut />
            </div>
            <LoginDialog />
            <NavBar />
        </div>
    </div>
))

export default Header
