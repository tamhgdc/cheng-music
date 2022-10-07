import React, { memo, useEffect } from 'react'
import { useAsyncFn } from 'react-use'

import songListApi from '~/api/songlist'
import Official from './Official'
import Cover from '~/components/Cover'
import './index.less'

const Ranking = memo(() => {
    const [songlist, getSonglistFn] = useAsyncFn(songListApi.getTopList)
    
    useEffect(() => {
        getSonglistFn()
    }, [])

    return (
        <div className='ranking'>
            <div className='ranking-offcial'>
                <div className='ranking-title'>官方榜</div>
                {!songlist.loading && (
                    songlist.value?.slice(0, 4)?.map((item) => (
                        <Official key={item.id} data={item} />
                    ))
                )}
            </div>
            <div className='ranking-world'>
                <div className='ranking-title'>
                    全球榜
                </div>
                <div className='cover'>
                    {!songlist.loading && (
                    songlist.value?.slice(4)?.map((item) => (
                        <Cover 
                          key={item.id} 
                          pid={item.id} 
                          path='songlists'
                          name={item.name}
                          playCount={item.playCount}
                          picUrl={`${item.coverImgUrl}?param=210y210`} />
                    ))
                )}
                </div>
            </div>
        </div>
    )
})

export default Ranking
