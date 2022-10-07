import React, { useEffect, useState, useCallback } from 'react'
import { useAsyncFn } from 'react-use'
import cn from 'classnames'
import { observer } from 'mobx-react'
import useStores from '~/hooks/useStores'

import songListApi, { NewSongType } from '~/api/songlist'
import NewMusicList from '~/components/NewMusicList'
import './index.less'
import { IMusic } from '~/api/types/songlist'

interface TabType{
    title: string
    type: NewSongType
}

const typeList:TabType[] = [
    { title: '全部', type: NewSongType.ALL },
    { title: '华语', type: NewSongType.CN },
    { title: '欧美', type: NewSongType.EU },
    { title: '韩国', type: NewSongType.KR },
    { title: '日本', type: NewSongType.JP },
] 

const NewSong: React.FC = () => {
    const [tab, setTab] = useState(NewSongType.ALL)
    const { Music } = useStores()
    const [songList, getSongListFn] = useAsyncFn(songListApi.getNewSongList)
    
    useEffect(() => {
        getSongListFn(tab)
    }, [tab, setTab])

    const playAll = useCallback(
        () => {
            Music.playAll<IMusic>(songList.value)
        },
        [songList, getSongListFn],
    )
    
    return (
        <div className='new-song'>
            <div className='new-header'>
                <div className='tabs'>
                    {typeList.map((item) => (
                        <div className={cn('tabs-item', item.type === tab && 'active')} key={item.type} onClick={() => setTab(item.type)}>
                            {item.title}
                        </div>
                    ))}
                </div>
                <div className='new-play' onClick={playAll}>
                    播放全部
                </div>
            </div>
            <div className='new-list'>
                {!songList.loading && (
                    <NewMusicList data={songList.value} />
                )}
            </div>
        </div>
)
 }

export default observer(NewSong)
