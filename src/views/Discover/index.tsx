import React, { memo, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { RouterConfig } from '~/router/index'

import './index.less'

import TbaList from '~/components/TabList'

interface TabProps {
    routes: RouterConfig[]
}

const Discover: React.FC<TabProps> = memo(({ routes }) => {
    const routeList = routes[1].routes

    const { pathname } = useLocation()
    const { replace } = useHistory()

    useEffect(() => {
        if (pathname === '/discover') {
            replace('/discover/recommend')
        }
    }, [pathname])
    
    return (
        <div className='discover'>
            {/* 跳转链接 */}
            <div className='tab'>
                <TbaList routes={routeList} />
            </div>
            {/* 匹配子路由 */}
            <div className='main-wrapper'>
                {/* <Redirect to='/discover/recommend' /> */}
                {renderRoutes(routeList)}
            </div>
        </div>
    )
})

export default Discover
