import React, { memo, useEffect, useState } from 'react'
import cn from 'classnames'
import { useParams } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import { IDictionary } from '~/typings/global'

import serachApi from '~/api/search'
import { SearchType, ITab } from '~/api/types/search'
import ResList from './ResList'
import './index.less'
import Pagination from '~/components/Pagination'
import { searchCount } from '~/constants/pageCount'

const Tabs: ITab[] = [
    {
        title: '单曲',
        type: SearchType.SINGLE,
        tag: '首',
        key: 'songCount',

    },
    {
        title: '歌手',
        type: SearchType.SINGER,
        tag: '位',
        key: 'artistCount',
    },
    {
        title: '专辑',
        type: SearchType.ALBUM,
        tag: '张',
        key: 'albumCount',
    },
    {
        title: '歌单',
        type: SearchType.SONGLIST,
        tag: '个',
        key: 'playlistCount',
    },
    {
        title: '用户',
        type: SearchType.USER,
        tag: '位',
        key: 'userprofileCount',
    },
]

const Search: React.FC = memo(() => {
    const { keywords } = useParams<IDictionary<string>>()
    const [tab, setTab] = useState(Tabs[0])
    const [page, setPage] = useState(1)

    const [searchResult, getSerachResult] = useAsyncFn(serachApi.getSerachResult)

    useEffect(() => {
        getSerachResult(keywords, tab.type)
    }, [keywords, tab.type])

    const onChangePage = (curretPage: number) => {
        setPage(curretPage)
        getSerachResult(keywords, tab.type, searchCount, curretPage * searchCount)
    }

    return (
        <div className='search'>
            <div className='title'>
                {keywords}
                <span className='search-count'>
                    {`找到${searchResult.value?.[tab.key] || 0}${tab.tag}${tab.title}`}
                </span>
            </div>
            <div className='tabs'>
                {Tabs.map((item) => (
                    <div 
                      key={item.title} 
                      className={cn('tabs-item', item === tab && 'active')}
                      onClick={() => setTab(item)}>
                        {item.title}
                    </div>
                ))}
            </div>
            <div>
                
                {searchResult.value?.songs ? <ResList data={searchResult.value?.songs} /> : '暂未开发'}

                {searchResult.value?.songs && (
                <Pagination 
                  OnchangePageFn={onChangePage} 
                  total={searchResult.value[tab.key]} 
                  count={100}
                  currentPage={page} />
                )}
            </div>
        </div>
)
 })

export default Search
