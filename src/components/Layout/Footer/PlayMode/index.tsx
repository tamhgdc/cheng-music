import React from 'react'
import { observer } from 'mobx-react'

import { OrderedListOutlined, RedoOutlined, RetweetOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import useStores from '../../../../hooks/useStores'
import { MODE, MODE_TYPE } from '../../../../constants/play'

const PlayMode: React.FC = () => {
    const { Music } = useStores()
    const { playMode } = Music

    const handleChangePlayMode = (type:MODE) => {
        Music.setPlayMode(type)
    }

    return (
        <>
            <Tooltip placement='top' title={MODE_TYPE[playMode].mode}>
                {playMode === 'PLAY_IN_ORDER' && <OrderedListOutlined onClick={() => handleChangePlayMode(MODE.SINGLE_CYCLE)} />}
                {playMode === 'SINGLE_CYCLE' && <RedoOutlined onClick={() => handleChangePlayMode(MODE.SHUFFLE_PLAYBACK)} />}
                {playMode === 'SHUFFLE_PLAYBACK' && <RetweetOutlined onClick={() => handleChangePlayMode(MODE.PLAY_IN_ORDER)} />}
            </Tooltip>
        </>
)
}

export default observer(PlayMode)
