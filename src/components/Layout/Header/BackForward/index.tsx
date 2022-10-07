import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import useStores from '~/hooks/useStores'

import './index.less'

const BcakForWard = memo(() => {
    const history = useHistory()
    const { Music } = useStores()
    const handleGoBack = () => {
        Music.toggleLyricsState(false)
        history.goBack()
    }
    const handleForward = () => history.goForward()
    return (
        <div className='back-forward'>
            <div className='menu'>
                <LeftOutlined onClick={handleGoBack} />
            </div>
            <div className='menu'>
                <RightOutlined onClick={handleForward} />
            </div>
        </div>
    )
})

export default BcakForWard
