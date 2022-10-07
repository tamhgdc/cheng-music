import React, { memo } from 'react'

import { useAsync } from 'react-use'

import Title from '~/components/Title/index'
import recommentApi from '~/api/recomment'
import Cover from '~/components/Cover/index'

const List: React.FC = memo(() => {
    const { value: recommentData } = useAsync(recommentApi.getRecommentList)
    return (
        <div>
            <Title type='link' text='推荐歌单' />
            <div className='cover'>
                {
                recommentData?.map((item) => (
                    <Cover key={item.id} path='songlists' pid={item.id} name={item.name} picUrl={item.picUrl} playCount={item.playCount} />
                    ))
            }
            </div>
        </div>
)
 })

export default List
