import React, { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AliwangwangFilled } from '@ant-design/icons'
import useStores from '~/hooks/useStores'

import './index.less'

const Logo = memo(() => {
    const { Music } = useStores()
    
    const closeDetail = useCallback(() => {
        Music.toggleLyricsState(false)
    }, [])

    return (
        <Link to='/discover/recommend' className='logo' onClick={closeDetail}>
            <AliwangwangFilled className='icon' />
            <h1 className='logo-title'>橙子音乐</h1>
        </Link>
    )
 })

export default Logo
