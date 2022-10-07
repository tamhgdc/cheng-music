import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import {
 StepForwardOutlined, StepBackwardOutlined, CaretRightOutlined, PauseOutlined, 
} from '@ant-design/icons'
import useStores from '~/hooks/useStores'

import './index.less'

const PlayAtions: React.FC = () => {
    const { Music } = useStores()
    const {
 audioInfo, controls, currentSong, playList, 
} = Music
    const togglePlayStatus = useCallback((flag:boolean) => {
        Music.setMusicState(flag)
    }, [audioInfo?.paused, controls])

    const play = useCallback((prev?:boolean) => {
        const len = playList.length
        if (len < 1) {
            return
        }
        const index = playList.findIndex(({ musicId }) => currentSong?.musicId === musicId)
        let nextIndex = -1
        if (index > -1) {
            nextIndex = prev ? (index - 1 + len) % len : (index + 1) % len
        } else {
            nextIndex = 0
        }
        Music.playListMusic(nextIndex)
    }, [playList, currentSong?.musicId])

    return (
        <div className='play-ations'>
            <StepBackwardOutlined onClick={() => play(true)} />
            <div className='play-control'>
                {Music.audioInfo.paused
                ? <CaretRightOutlined onClick={(e) => togglePlayStatus(true)} /> 
                : <PauseOutlined onClick={(e) => togglePlayStatus(false)} />}
            </div>
            <StepForwardOutlined onClick={() => play(false)} />
        </div>
)
}

export default observer(PlayAtions)
