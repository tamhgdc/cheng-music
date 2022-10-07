import React, { memo, useEffect } from 'react'
import { useAsyncFn } from 'react-use'

import { Skeleton } from 'antd'
import recommentApi from '~/api/recomment'
import songListApi from '~/api/songlist'
import mvApi from '~/api/mv'
import Title from '~/components/Title'
import SwiperList from '~/components/Swipers'
import MvList from './MvList'
import NewMusicList from '~/components/NewMusicList'
import List from './List'
import './index.less'

const Recommend: React.FC = memo(() => {
    const [banners, getBannersFn] = useAsyncFn(recommentApi.getBanners)
    const [newSongs, getNewSongsFn] = useAsyncFn(songListApi.getNewSongList)
    const [recommendMv, getRecommendMvFn] = useAsyncFn(mvApi.getRecommendMv)

    useEffect(() => {
        getBannersFn()
        getNewSongsFn()
        getRecommendMvFn()
    }, [])

    return (
        <div className='recommend'>
            {/* 轮播图 */}
            <div>
                {
                    banners.loading ? <Skeleton /> : <SwiperList banners={banners.value} />
                }
            </div>
            {/* 推荐歌单 */}
            <List />
            {/* 最新音乐 */}
            <div>
                <Title type='link' text='最新音乐' />
                {
                    newSongs.loading ? <Skeleton /> : <NewMusicList data={newSongs.value?.slice(0, 12)} />
                }
            </div>
            {/* 推荐mv */}
            <div>
                <Title type='link' text='推荐MV' />
                {
                    recommendMv.loading ? <Skeleton /> : <MvList data={recommendMv?.value} />
                }
            </div>
        </div>
    )
})

export default Recommend
