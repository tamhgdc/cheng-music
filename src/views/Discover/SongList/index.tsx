import React, { memo, useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'

import HighQuality from './HighQuality'
import Categories from './Categories'
import MyPagination from '../../../components/Pagination'
import Cover from '../../../components/Cover'
import songlistApi from '../../../api/songlist'
import './index.less'

const PAGE = 1

const songList = memo(() => {
    const [selectedCat, setSelectedCat] = useState('全部')
    const [page, setPage] = useState(PAGE)
    
    const [highQuality, getRHighQualityFn] = useAsyncFn(songlistApi.getRHighQuality)
    const [hotcats, getHotCatsFn] = useAsyncFn(songlistApi.getSonglistHotCats)
    const [playlists, getHighSongListsFn] = useAsyncFn(songlistApi.getHighSonglists)
    const [categories, getCategoriesFn] = useAsyncFn(songlistApi.getCategories)
    
    useEffect(() => {
        getRHighQualityFn(selectedCat)
        getHotCatsFn()
        getHighSongListsFn({ cat: selectedCat, offset: page })
        getCategoriesFn()
    }, [])
    
    /* 切换类别，清空页码数 */
    const handleCatSelect = (cat:string) => {
        getRHighQualityFn(cat)
        getHighSongListsFn({ cat, offset: (page - 1) * 100 })
        setSelectedCat(cat)
        setPage(PAGE)
    }

    /* 改变页码 */
    const OnchangePageFn = (ipage: number) => {
        getHighSongListsFn({ offset: (ipage - 1) * 100 })
        setPage(ipage)
    }

    return (
        <div className='songlist'>
            {/* 头部 */}
            <div className='songlist-highquality'>
                <HighQuality data={highQuality.value} />
            </div>
            {/* 选择类别 */}
            <div className='songlist-categories'>
                <Categories hotcats={hotcats?.value} onCatSelect={handleCatSelect} cats={categories?.value} />
            </div>
            {/* cover */}
            <div className='cover'>
                {
                playlists?.value?.playlists.map((item) => (
                    <Cover key={item.id} path='songlists' pid={item.id} name={item.name} picUrl={item.coverImgUrl} playCount={item.playCount} />
                    ))
            }
            </div>
            {/* 分页 */}
            <MyPagination total={playlists?.value?.total} currentPage={page} OnchangePageFn={OnchangePageFn} count={100} />
            <div />
        </div>
    )
})

export default songList
