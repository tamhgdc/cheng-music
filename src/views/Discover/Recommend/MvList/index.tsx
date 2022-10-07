import React, { memo } from 'react'

import { Image } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { IMv } from '~/api/types/mv'
import { formatCount } from '~/utils/format'
import EmptyPic from '~/assets/image/empty.png'
import './index.less'

interface IProps{
    data?: IMv[]
}

const MvItem: React.FC<IProps> = memo(({ data }) => (
    <div className='mv-list'>
        {data?.map((item) => (
            <div className='mv-item' key={item.id}>
                <div className='mv-pic'>
                    <Image 
                      src={`${item.picUrl}?param=280y155`} 
                      preview={false} 
                      fallback={EmptyPic}
                      loading='lazy' />
                    <span className='mv-count'>
                        <CaretRightOutlined />
                        {formatCount(item.playCount)}
                    </span>
                    <span className='mv-title'>{item.copywriter}</span>
                </div>
                <div className='mv-info'>
                    <div className='mv-name'>
                        {item.name}
                    </div>
                    <div className='mv-artists'>
                        {item.artists.map(({ name }) => name).join('/')}
                    </div>
                </div>
            </div>
        ))}
    </div>
))

export default MvItem
