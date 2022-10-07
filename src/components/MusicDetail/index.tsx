import React, { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import cn from 'classnames'
import { useAsyncFn } from 'react-use'
import { Image } from 'antd'
import useStores from '~/hooks/useStores'
import useLikeUpdate from '~/hooks/useLikeUpdate'

import commentApi from '~/api/comment'
import songlistApi from '~/api/songlist'
import { LickType } from '~/api/types/comment'
import Lyric from './Lyric'
import RelatedList, { RELATED_TYPE } from './RelatedList'
import Comments from '../Comments'
import { formatLyric } from '~/utils/format'
import playBar from '~/assets/image/play-bar.png'
import playCd from '~/assets/image/play-cd.png'
import './index.less'

const MusicDetail = () => {
    const { Music } = useStores()
    const { currentSong, showLyrics, audioInfo } = Music
    const [{ value: lyric }, getLyricFn] = useAsyncFn(songlistApi.getLyric)
    const [{ value: relatedSong }, getRelatedSongFn] = useAsyncFn(songlistApi.getRelatedSong)
    const [{ value: commentData }, getCommentFn] = useAsyncFn(commentApi.getSongComment)
    const [{ value: relateSongList }, getRelateSongListFn] = useAsyncFn(songlistApi.getRelatedSongList)
    
    useEffect(() => {
        if (showLyrics) {
            getLyricFn(currentSong.musicId)
            getCommentFn(currentSong.musicId)
            getRelatedSongFn(currentSong.musicId)
            getRelateSongListFn(currentSong.musicId)
        }
    }, [currentSong.musicId, showLyrics])

    const { onUpDateCidLiked } = useLikeUpdate(commentData)
    
    const onChangePage = useCallback(
        (page:number) => {
            getCommentFn(currentSong.musicId, page)
        },
        [currentSong.musicId],
    )
    
    return (
        <div className={cn('music-detail', showLyrics && 'detail-show')}>
            <div className='detail-cover'>
                <div className='detail-header'>
                    <div className='detail-h-wrap'>
                        <div className='cd-bar'>
                            <Image className='play-cd' src={playCd} preview={false} />
                            <Image className={cn('play-bar', !audioInfo.paused && 'play')} src={playBar} preview={false} />
                        </div>
                        <div className='detail-h-circle'>
                            <div className={cn('circle-cover', !audioInfo.paused && 'play')}>
                                <Image src={`${currentSong?.authorInfo?.picUrl}?params=190y190`} preview={false} />
                            </div>
                        </div>
                    </div>
                    <div className='detail-lyric'>
                        {lyric
                        && (
                        <Lyric 
                          title={currentSong?.authorInfo?.name} 
                          artist={currentSong?.authorInfo?.author}
                          time={audioInfo?.time}
                          lines={formatLyric(lyric?.lrc?.lyric)}
                          paused={audioInfo?.paused} />
                        )}
                    </div>
                </div>
                <div className='detail-info'>
                    {/* 评论 */}
                    <div className='detail-comment'>
                        {
                        commentData
                        && (
                        <Comments
                          onChangePage={onChangePage}
                          onUpDateCidLiked={onUpDateCidLiked}
                          total={commentData?.total} 
                          type={LickType.SONG}
                          id={currentSong?.musicId}
                          moreHot={commentData?.moreHot}
                          comments={commentData?.comments}
                          hotComments={commentData?.hotComments}
                          more={commentData?.more} />
                        )
                    }
                    </div>
                    <div className='detail-related'>
                        <div className='related-list'>
                            <div className='related-title'>
                                包含这首歌的歌单
                            </div>
                            {
                                relateSongList && (
                                    relateSongList?.map((item) => <RelatedList key={item.id} data={item} type={RELATED_TYPE.PLAYList} />)
                                )
                            }
                        </div>
                        <div className='related-song'>
                            <div className='related-title'>
                                相似歌曲
                            </div>
                            {
                                relatedSong && (
                                    relatedSong?.map((item) => <RelatedList key={item.id} data={item} type={RELATED_TYPE.SONG} />)
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
 }

export default observer(MusicDetail)
