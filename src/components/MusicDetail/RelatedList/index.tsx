import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'

import { Image } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import useSotres from '~/hooks/useStores'
import { IMusic, ISonglist, Track } from '~/api/types/songlist'
import './index.less'
import { fommatArtist, formatCount } from '~/utils/format'

// eslint-disable-next-line no-shadow
export enum RELATED_TYPE {
    SONG = 'SONG',
    PLAYList = 'PLAYList',
}
interface Iprops {
    data: IMusic | ISonglist
    type: RELATED_TYPE
}

const RelatedList: React.FC<Iprops> = ({ data, type }) => {
    const { Music } = useSotres()
    const { push } = useHistory()

    const handleToPage = useCallback((e:IMusic) => {
        if (type === RELATED_TYPE.SONG) {
            /* 播放歌曲 */
            const newD = (e as IMusic)
            Music.playMusic(newD.id, newD.duration / 1000, {
                picUrl: newD.album.picUrl, 
                name: newD.name, 
                id: newD.album.id, 
                author: fommatArtist(newD.artists),
            })
        } else {
            /* 跳转到响应的歌单 */
            push(`/songlists/${e.id}`)
            Music.toggleLyricsState(false)
        }
    }, [type, data])
    
    return (
        <div className='related-item' onClick={() => handleToPage(data as IMusic)}>
            <div className='related-pic'>
                {/* 播放图标 */}
                {type === RELATED_TYPE.SONG && (
                <div className='icon-cover'>
                    <CaretRightOutlined />
                </div>
            )}
                <Image 
                  src={`${((data as IMusic).album?.picUrl || (data as ISonglist).coverImgUrl)}?param=55y55`} 
                  width={55} 
                  height={55} 
                  preview={false} 
                  loading='lazy' />
            </div>
            <div className='related-info'>
                <div className='related-name'>
                    {data?.name}
                </div>
                <div className='related-artist'>
                    {
                    type === RELATED_TYPE.SONG  
                    ? (data as IMusic)?.artists?.map(({ name }) => name).join('/')
                    : (
                        <>
                            <CaretRightOutlined />
                            {formatCount((data as ISonglist)?.playCount)}
                        </>
                      )
                }
                </div>
            </div>
        </div>
    )
}

export default observer(RelatedList)
