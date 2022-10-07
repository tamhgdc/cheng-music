import React, { useCallback } from 'react'
import { observer } from 'mobx-react'

import { MusicType } from '~/store/music/type'
import List from '../List'
import useStores from '~/hooks/useStores'

const PlayList: React.FC = () => {
    const { Music } = useStores()
    const { playList, controls } = Music

    const playMusic = useCallback(
        (e:MusicType) => {
            const index = playList.findIndex(({ musicId }) => musicId === e.musicId)
            Music.playListMusic(index)
        },
        [controls, playList, Music.audioInfo, Music.controls, Music.currentSong],
    )

    return (
        <div>
            <List data={playList} handleDoubleClick={playMusic} />
        </div>
    )
 }

export default observer(PlayList)
