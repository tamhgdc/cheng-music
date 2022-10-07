import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react'

import { Image, Tooltip } from 'antd'

import { DoubleLeftOutlined, DoubleRightOutlined, MenuFoldOutlined } from '@ant-design/icons'
import defaultPic from '~/assets/image/defaultPic.png'
import useStores from '~/hooks/useStores'
import ProgressBar from './ProgressBar'
import Artist from './Artist'
import AudioTimer from './AudioTimer'
import PlayAtions from './PlayAtions'
import PlayMode from './PlayMode'
import PlayRecord from './PlayRecord'
import PlayVolume from './PlayVolume'
import './index.less'

const Footer = () => {
    const { Music } = useStores()
    const { currentSong, audioInfo, showLyrics } = Music
    const [recordShow, setRecordShow] = useState(false)

    const changeLysicState = () => {
            Music.toggleLyricsState()
    }

    const handleChangeRocord = useCallback(
        (flag:boolean) => {
            setRecordShow(flag)
        },
        [recordShow],
    )

    return (
        <div className='footer'>
            {/* 进度条 */}
            <div className='progress'>
                <ProgressBar />
            </div>
            {/* 信息 */}
            <div className='footer-wrap'>
                {
                   currentSong.musicId !== -1 && (
                   <>
                       <div className='wrap-pic' onClick={changeLysicState}>
                           <Image 
                             src={`${currentSong.authorInfo.picUrl}?param=40y40`} 
                             preview={false} 
                             width={40} 
                             height={40}
                             fallback={defaultPic}
                             placeholder
                             loading='lazy' />
                           {!showLyrics && <DoubleRightOutlined />}
                           {showLyrics && <DoubleLeftOutlined />}
                       </div>
                       <div>
                           <div className='wrap-info'>
                               <span>{currentSong?.authorInfo.name}</span>
                               <Artist name={currentSong?.authorInfo.author} id={currentSong?.authorInfo.id} />
                           </div>
                           <div className='wrap-time'>
                               <AudioTimer sumTime={audioInfo?.duration} currentTime={audioInfo?.time} />
                           </div>
                       </div>
                   </>
                )
                }
            </div>
            {/* 播放 */}
            <div className='footer-ation'>
                <PlayAtions />
            </div>
            {/* 右侧 */}
            <div className='other-ation'>
                <PlayMode />
                <Tooltip placement='top' title='打开播放列表'>
                    <MenuFoldOutlined onClick={(e) => handleChangeRocord(true)} />
                </Tooltip>
                <PlayVolume />
            </div>
            <PlayRecord isShow={recordShow} onClickAway={() => handleChangeRocord(false)} />
        </div>
    )
 }

 export default observer(Footer)
