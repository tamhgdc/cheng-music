import React, { useState, useCallback, useRef } from 'react'
import { observer } from 'mobx-react'
import cn from 'classnames'
import { useClickAway } from 'react-use'

import { DeleteOutlined } from '@ant-design/icons'
import PlayList from './PlayList'
import CHistoryList from './HistoryList'
import useStores from '~/hooks/useStores'
import './index.less'
import { IDictionary } from '~/typings/global'

interface IProps{
    isShow: boolean
    onClickAway: ()=>void
}
interface ITabs {
    title: string
    key: string
}

const TabList: IDictionary<ITabs> = {
    playList: {
        title: '播放列表',
        key: 'playList',
    },
    historyList: {
        title: '历史记录',
        key: 'historyList',
    },
}

const PlayRecord: React.FC<IProps> = ({ isShow, onClickAway }) => {
    const ref = useRef(null)
    const { Music } = useStores()
    const { playList, historyList } = Music
    const [activeTab, setActiveTab] = useState(TabList.playList.key)
    
    /* 点击其他区域关闭 */
    useClickAway(ref, () => {
        onClickAway()
    })

    const clearSongList = useCallback(
        () => {
            Music.clearPlayList(activeTab)
        },
        [playList, activeTab, historyList],
    )

    return (
        <div className={cn('play-record', isShow ? 'show' : '')} ref={ref}>
            {isShow && (
                <>
                    <div className='record-tabs'>
                        {Object.keys(TabList).map((key) => (
                            <div 
                              key={key} 
                              className={cn('record-tab', key === activeTab && 'active')}
                              onClick={() => setActiveTab(key)}>
                                {TabList[key].title}
                            </div>
                        ))}
                    </div>
                    <div className='record-header'>
                        <div className='sum-count'>
                            总共
                            {Music[activeTab]?.length}
                            首
                        </div>
                        <div className='clear-song' onClick={clearSongList}>
                            清空
                            <DeleteOutlined />
                        </div>
                    </div>
                    <div>
                        {activeTab === 'playList' ? <PlayList /> : <CHistoryList />}
                    </div>
                </>
            )}
        </div>
)
}

export default observer(PlayRecord)
