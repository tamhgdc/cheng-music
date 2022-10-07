import React, { memo, useEffect, useCallback } from 'react'
import { useAsyncFn } from 'react-use'
import { useParams } from 'react-router-dom'

import { Tabs } from 'antd'
import { LickType } from '~/api/types/comment'
import Comments from '~/components/Comments/index'
import Musiclist from '~/components/MusicList/index'
import BaseInfo from './BaseInfo/index'
import { IDictionary } from '~/typings/global'
import SongListApi from '~/api/songlist'
import CommentApi from '~/api/comment'
import './index.less'
import useLikeUpdate from '~/hooks/useLikeUpdate'

const { TabPane } = Tabs

const SongListDetail: React.FC = memo(() => {
    const { id } = useParams<IDictionary<string>>()
    
    const [{ value: songList }, getSongListFn] = useAsyncFn(SongListApi.getSongList)
      
    const [{ value: songComment }, getSongSCommentFn] = useAsyncFn(CommentApi.getSongSComment)

    useEffect(() => {
      getSongSCommentFn(id)
      getSongListFn(id)
    }, [id])

    const { onUpDateCidLiked } = useLikeUpdate(songComment)

    const onChangePage = useCallback((page:number) => {
      getSongSCommentFn(id, page)
    }, [id])
    
    return (
        <div className='song-list-detail'>
            <div className='song-baseinfo'>
                <BaseInfo data={songList} />
            </div>
            <div className='song-content'>
                <Tabs defaultActiveKey='1' className='song-tabs'>
                    <TabPane tab='歌曲列表' key='1'>
                        <Musiclist data={songList?.tracks} />
                    </TabPane>
                    <TabPane tab='评论' key='2'>
                        {
                        songComment && (
                        <Comments
                          onChangePage={onChangePage}
                          onUpDateCidLiked={onUpDateCidLiked}
                          total={songComment.total} 
                          type={LickType.LIST}
                          id={id}
                          moreHot={songComment.moreHot}
                          comments={songComment.comments}
                          hotComments={songComment.hotComments}
                          more={songComment.more} />
                        )
                      }
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
})

export default SongListDetail
