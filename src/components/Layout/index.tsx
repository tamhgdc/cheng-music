import React, { memo } from 'react'

import './index.less'

import Header from './Header'
import Sider from './Sider'
import Footer from './Footer'

const Layout: React.FC = memo(({ children }) => (
    <div className='layout'>
        <Header />
        <main className='middle'>
            <Sider />
            <div className='content'>{children}</div>
        </main>
        <Footer />
    </div>
))

export default Layout
