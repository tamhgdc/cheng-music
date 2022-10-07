import React, { memo } from 'react'

import { Image } from 'antd'
import { ISonglist } from '../../../../api/types/songlist'
import './index.less'

interface IProps {
    data?: ISonglist
  }

const HighQuality: React.FC<IProps> = memo(({ data }) => (
    <div className='high-quality'>
        {/* 背景 */}
        <img 
          src={`${data?.coverImgUrl}?param=1200y200`} 
          className='high-bg'
          loading='lazy'  
          alt={data?.name} />
        <Image className='high-img' src={`${data?.coverImgUrl}?param=150y150`} preview={false} loading='lazy' />
        <div className='high-right'>
            <div className='high-tag'>
                精品歌单
            </div>
            <div className='high-info'>
                {data?.name}
            </div>
            <div className='high-tips'>
                {data?.copywriter}
            </div>
        </div>
    </div>
))

export default HighQuality
