import React, { useCallback } from 'react'
import { observer } from 'mobx-react'

import { MusicType } from '~/store/music/type'
import List from '../List'
import useStores from '~/hooks/useStores'

const CHistoryList: React.FC = () => {
    const { Music } = useStores()
    const { historyList, controls } = Music

    const playMusic = useCallback(
        (e:MusicType) => {
            const index = historyList.findIndex(({ musicId }) => musicId === e.musicId)
            Music.playListMusic(index)
        },
        [controls, historyList],
    )

    return (
        <div>
            <List data={historyList} handleDoubleClick={playMusic} />
        </div>
    )
 }

export default observer(CHistoryList)
