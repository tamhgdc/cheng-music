import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react'

import { NotificationOutlined } from '@ant-design/icons'
import { Slider } from 'antd'
import useStores from '../../../../hooks/useStores'
import './index.less'

const PlayVolume: React.FC = () => {
    const { Music } = useStores()
    const [value, setvalue] = useState(100)

    const onChangeVolume = useCallback((data: number) => {
            setvalue(data)
            Music.setPlayVolume(data / 100)
        },
        [])

    return (
        <div className='play-volume'>
            <NotificationOutlined />
            <Slider value={value} onChange={onChangeVolume} />
        </div>
) 
}

export default observer(PlayVolume)
